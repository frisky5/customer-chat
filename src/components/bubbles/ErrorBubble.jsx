import { Alert } from "@mui/material";

import { useSelector } from "react-redux";
export default function ErrorBubble(props) {
  return (
    <div className="info">
      <Alert severity="error">
        <p style={{ fontSize: "16px", margin: 0 }}> {props.message.text}</p>
      </Alert>
    </div>
  );
}
