import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import Download from "../../api/chat/attachments/Download";
import { useSelector } from "react-redux";
export default function CustomerBubble(props) {
  const dir = useSelector((state) => state.avaya.dir);
  function isRTL(s) {
    let rtlDirCheck = new RegExp(
      "^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]{1}"
    );

    return rtlDirCheck.test(s);
  }

  return (
    <Box
      sx={{
        alignSelf: "flex-start",
        maxWidth: "80%",
        bgcolor: "transparent",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#53d769",
          height: 50,
          width: 50,
        }}
      >
        <PersonRoundedIcon sx={{ fontSize: 35 }} />
      </Avatar>
      <div className={props.message.senderType}>
        <Box p={1}>
          <Typography>{props.message.text}</Typography>
        </Box>
      </div>
    </Box>
  );
}
