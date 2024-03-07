import { Alert, Typography } from "@mui/material";

export default function InfoBubble(props) {
  return (
    <div className="info">
      <Alert severity="info">
        <p style={{ fontSize: "16px", margin: 0 }}>{props.message.text}</p>
      </Alert>
    </div>
  );
}
