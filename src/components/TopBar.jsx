import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/jadarat_logo.svg";
export default function TopBar(props) {
  const theme = useTheme();
  return (
    <Box
      height={"60px"}
      width={"100%"}
      sx={{ top: "0", position: "fixed" }}
      style={{
        background:
          "linear-gradient(90deg, rgba(18,133,136,1) 0%, rgba(255,255,255,1) 87%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Stack
        pl={3}
        pr={3}
        height={"100%"}
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <img src={logo} height={"40px"} />
        <Typography color={"white"} variant="h6" pl={3}>
          المحادثة الفورية
        </Typography>
      </Stack>
    </Box>
  );
}
