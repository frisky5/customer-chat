import { createSlice } from "@reduxjs/toolkit";

export const avaya = createSlice({
  name: "avaya",
  initialState: {
    dir: "ltr",
    language: "en",
    messages: [],
    chatStarted: false,
    chatEnded: false,
    participants: [],
    isTyping: [],
    sendShortcutTrigger: false,
    answered: false,
    initialized: false,
    chatInitialData: null,
    internalServerError: false,
    autoSelectedLang: false,
    connectedToOldChat: false,
    chatExpired: false,
    disableExpireTimer: false,
  },
  reducers: {
    setDisableExpireTimer: (state, action) => {
      state.disableExpireTimer = action.payload;
    },
    setDir: (state, action) => {
      state.dir = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatStarted: (state, action) => {
      state.chatStarted = action.payload;
    },
    setChatEnded: (state, action) => {
      state.chatEnded = action.payload;
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    pushIsTyping: (state, action) => {
      state.isTyping.push(action.payload);
    },
    deleteIsTyping: (state, action) => {
      state.isTyping.splice(
        state.isTyping.findIndex((item) => item.agentId === action.payload),
        1
      );
    },
    setSendShortcutTrigger: (state, action) => {
      state.sendShortcutTrigger = action.payload;
    },
    setAnswered: (state, action) => {
      state.answered = action.payload;
    },
    setAutoSelectedLanguage: (state, action) => {
      state.autoSelectedLang = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setChatInitialData: (state, action) => {
      state.chatInitialData = action.payload;
    },
    setInternalServerError: (state, action) => {
      state.internalServerError = action.payload;
    },
    setConnectedToOldChat: (state, action) => {
      state.connectedToOldChat = action.payload;
    },
    resetStore: (state, action) => {
      state.dir = "ltr";
      state.language = "en";
      state.messages = [];
      state.chatStarted = false;
      state.chatEnded = false;
      state.participants = [];
      state.isTyping = [];
      state.sendShortcutTrigger = false;
      state.answered = false;
      state.initialized = false;
      state.chatInitialData = null;
      state.internalServerError = false;
      state.autoSelectedLang = false;
    },
    setChatExpired: (state, action) => {
      state.chatExpired = action.payload;
    },
  },
});

export const {
  setDir,
  setLanguage,
  pushMessage,
  setChatStarted,
  setChatEnded,
  setParticipants,
  pushIsTyping,
  deleteIsTyping,
  setSendShortcutTrigger,
  setInitialized,
  setChatInitialData,
  setInternalServerError,
  resetStore,
  setAutoSelectedLanguage,
  setConnectedToOldChat,
  setChatExpired,
  setDisableExpireTimer,
} = avaya.actions;
export default avaya.reducer;
