import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SnackbarProvider } from "notistack";
import ChatContainer from "./components/chat/ChatContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { checkExistingChat, startChat } from "./avaya/logic";
import TopBar from "./components/TopBar";
import Stack from "@mui/material/Stack";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import ProfileDetails from "./components/ProfileDetails";

const globalTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3c8ebe",
    },
  },
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App(props) {
  const chatStarted = useSelector((state) => state.avaya.chatStarted);
  const initialized = useSelector((state) => state.avaya.initialized);
  const internalServerError = useSelector(
    (state) => state.avaya.internalServerError
  );
  const [loading, setLoading] = useState(true);
  const [openProfileDetails, setOpenProfileDetails] = useState(true);

  useEffect(() => {
    if (internalServerError) {
      setLoading(false);
    }
  }, [internalServerError]);

  useEffect(() => {
    checkExistingChat();
  }, []);

  function onStartHandler(data) {
    startChat(data);
    setOpenProfileDetails(false);
  }

  return (
    <CacheProvider value={cacheRtl}>
      <SnackbarProvider
        disableWindowBlurListener
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ThemeProvider theme={globalTheme}>
          <ProfileDetails
            onStart={onStartHandler}
            open={openProfileDetails && !chatStarted}
          />

          <Stack
            height="100vh"
            width="100vw"
            overflow={"hidden"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TopBar />
            {!chatStarted && (
              <Stack
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <CircularProgress size={70} />
                <Typography variant="h6">يرجى الانتظار</Typography>
              </Stack>
            )}
            <ChatContainer />
          </Stack>
        </ThemeProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default App;
