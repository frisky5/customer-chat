import { Alert, Typography } from "@mui/material";

export default function SuccessBubble(props) {
  return (
    <div className="info">
      <Alert severity="success">
        <Typography>{props.message.text}</Typography>
      </Alert>
    </div>
  );
}
