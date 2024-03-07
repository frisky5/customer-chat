import { Avatar, Box, Typography } from "@mui/material";

export default function AgentBubble(props) {
  return (
    <Box
      sx={{
        alignSelf: "flex-end",
        maxWidth: "80%",
        bgcolor: "transparent",
        position: "relative",
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "nowrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#147efb",
          height: 50,
          width: 50,
        }}
      />
      <div className={props.message.senderType}>
        <Box p={1}>
          <Typography>{props.message.text}</Typography>
        </Box>
      </div>
    </Box>
  );
}
