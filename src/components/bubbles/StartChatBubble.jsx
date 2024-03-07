import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { Alert, Button, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { startChat } from "../../avaya/logic";
export default function StartChatBubble(props) {
  const [loading, setLoading] = useState(false);
  const chatStarted = useSelector((state) => state.avaya.chatStarted);

  return (
    <div className="info">
      <Alert
        severity="info"
        action={
          <Button
            disabled={loading || chatStarted}
            variant="outlined"
            color="info"
            endIcon={<QuestionAnswerRoundedIcon />}
            onClick={() => {
              setLoading(true);
              setTimeout(startChat, 500);
            }}
          >
            chat with an agent
          </Button>
        }
      >
        <p style={{ fontSize: "16px", margin: 0 }}>
          In case the provided information doesn\'t align with your needs,
          please click "chat with an agent" to chat with one of our entities
          support team members
        </p>
        {loading && !chatStarted && <LinearProgress color="info" />}
      </Alert>
    </div>
  );
}
