import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { closeConversation, sendChatMessage } from "../../avaya/logic";
import { pushMessage } from "../../redux/slices/avaya";
import ChatBubble from "./Bubble";
import EndChatDialog from "./EndChatDialog";
import "./bubble.css";

export default function ChatContainer(props) {
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const chatInputRef = useRef(null);

  const chatStarted = useSelector((state) => state.avaya.chatStarted);

  const messages = useSelector((state) => state.avaya.messages);
  const chatEnded = useSelector((state) => state.avaya.chatEnded);

  const [openEndCHat, setOpenEndChat] = useState(false);

  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  function isEmpty() {
    return messageText == null || messageText.length === 0;
  }

  function sendMessage() {
    setSendingMessage(true);
    sendChatMessage(messageText);
    dispatch(
      pushMessage({
        type: "message",
        senderType: "customer",
        text: messageText,
      })
    );
    setMessageText("");
    setSendingMessage(false);
  }

  useEffect(() => {
    if (chatStarted) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        chatInputRef?.current?.focus();
      }, 100);
    }
  }, [messages, chatStarted, chatInputRef]);

  return (
    <Stack
      pt={8}
      height={"100%"}
      width={"100%"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      overflow={"auto"}
      display={chatStarted ? "flex" : "none"}
    >
      {/* <ChatExpiaryDialog /> */}
      <EndChatDialog
        onEnd={() => {
          closeConversation();
          setOpenEndChat(false);
        }}
        open={openEndCHat}
        onCancel={() => {
          setOpenEndChat(false);
        }}
      />
      <Stack
        p={2}
        pr={5}
        pl={5}
        sx={{
          width: "100%",
          display: chatStarted && !chatEnded ? "flex" : "none",
        }}
      >
        <Button
          endIcon={<LogoutIcon />}
          variant="contained"
          fullWidth
          sx={{ alignSelf: "center" }}
          color="warning"
          onClick={() => {
            setOpenEndChat(true);
          }}
        >
          خروج
        </Button>
      </Stack>
      <Stack
        height={"100%"}
        width={"100%"}
        gap={1}
        overflow={"auto"}
        flexDirection={"column"}
        flexWrap={"nowrap"}
        pb={2}
        pr={2}
        pl={2}
        flexGrow={1}
      >
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
        <div id="scroll-to-bottom" ref={bottomRef} />
      </Stack>

      <Box
        p={2}
        pl={3}
        pr={3}
        sx={{
          width: "100%",
          position: "sticky",
          bottom: 0,
          float: "left",
          background: "white",
          marginTop: "auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          id={"chatInput"}
          inputRef={chatInputRef}
          autoFocus={true}
          autoComplete="off"
          fullWidth
          dir="auto"
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={isEmpty() || sendingMessage || !chatStarted}
                  color="primary"
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  <SendOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={{ dir: "auto" }}
          label={"اكتب رسالتك ...."}
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          disabled={sendingMessage || !chatStarted || chatEnded}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isEmpty()) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
      </Box>
    </Stack>
  );
}
