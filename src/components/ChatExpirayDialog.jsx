import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeConversation, startExpiaryCounter } from "../avaya/logic";
import { setChatExpired } from "../redux/slices/avaya";
import { useEffect, useState } from "react";

const timeoutIntervalInSec = 20;
const timeoutIntervalInMillis = timeoutIntervalInSec * 1000;

export default function ChatExpiaryDialog(props) {
  const chatExpired = useSelector((state) => state.avaya.chatExpired);
  const disableExpireTimer = useSelector(
    (state) => state.avaya.disableExpireTimer
  );

  const dispatch = useDispatch();

  const [timerStarted, setTimerStarted] = useState(false);
  const [remainingTime, setRemaningTime] = useState(0);
  const [mustKillChat, setMustKillchat] = useState(false);

  useEffect(() => {
    if (chatExpired && !timerStarted) {
      setTimerStarted(true);
      const futureTime = Date.now() + timeoutIntervalInMillis;
      setRemaningTime(timeoutIntervalInSec);
      const intervalId = setInterval(() => {
        if (Date.now() > futureTime) {
          clearInterval(intervalId);
          setMustKillchat(true);
        } else {
          setRemaningTime(futureTime - Date.now());
        }
      }, 200);
    }
  }, [chatExpired, timerStarted, remainingTime, disableExpireTimer]);

  useEffect(() => {
    if (chatExpired && mustKillChat) {
      dispatch(setChatExpired(false));
      closeConversation(
        "Chat Ended due to inactivity from your side for 2 minutes."
      );
    }
    if (!chatExpired && mustKillChat) {
      setMustKillchat(false);
      setTimerStarted(false);
    }
  }, [chatExpired, mustKillChat]);

  return (
    <Dialog open={chatExpired}>
      <DialogTitle>
        Chat is about to end automatically in {Math.floor(remainingTime / 1000)}
        , click Continue to keep it opened
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            startExpiaryCounter();
            dispatch(setChatExpired(false));
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
