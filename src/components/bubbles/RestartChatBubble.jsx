import { Avatar, Box, Button } from "@mui/material";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function RestartChatBubble(props) {
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
      <Button
        variant="contained"
        onClick={() => {
          window.location.reload();
        }}
        sx={{ maxWidth: "200px", alignSelf: "center" }}
        endIcon={<RestartAltIcon />}
      >
        بدأ محادثة جديدة
      </Button>
    </Box>
  );
}
