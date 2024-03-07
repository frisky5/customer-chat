import Create from "../api/chat/messages/Create";
import Read from "../api/chat/messages/Read";
import { config } from "../api/constants";
import {
  pushMessage,
  setChatEnded,
  setChatExpired,
  setChatStarted,
  setConnectedToOldChat,
  setInitialized,
  setInternalServerError,
} from "../redux/slices/avaya";

import store from "../redux/store";
import {
  closeConversationMessage,
  requestChatMessage,
  requestNewMessage,
  requestQueueStatusMessage,
} from "./messagesTemplates";

const wssPath = "wss://192.168.102.226:8445/CustomerControllerWeb/chat";

let wssConnection = null;

let customerDetails;
let oldChatDetected = false;
let requestedToCheckOldChat = false;
let sentInitialMessages = false;
let participantJoined = false;

let chatStartedAt;
let chatExpairyIntervalInSecs = 180;
let expiaryTimer = null;

export function checkExistingChat() {
  if (requestedToCheckOldChat) return;
  requestedToCheckOldChat = true;
  const oldGuid = window.localStorage.getItem("guid");
  const oldAuthenticationKey = window.localStorage.getItem("authenticationKey");
  if (oldGuid != null && oldAuthenticationKey != null) {
    oldChatDetected = true;
    connectWs();
  } else store.dispatch(setInitialized(true));
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function startChat(profileDetails) {
  customerDetails = profileDetails;
  connectWs();
}

export function connectWs() {
  if (wssConnection != null) {
    if (wssConnection.readyState !== WebSocket.CLOSED) return;
  }
  wssConnection = new WebSocket(wssPath);
  wssConnection.addEventListener("open", wssOpenEventListener);
  wssConnection.addEventListener("message", wssNewMessageEventListener);
  wssConnection.addEventListener("close", wssCloseEventListener);
  wssConnection.addEventListener("error", wssErrorEventListener);
}

function wssCloseEventListener(e) {
  console.log("websocket close reason code : ", e.code);
  if (e?.code != null && e.code !== 1000) {
    console.log("websocket close reason code is not 1000, reconnecting");
    requestedToCheckOldChat = false;
    checkExistingChat();
  }
}

function wssErrorEventListener(e) {}

function wssOpenEventListener(e) {
  if (oldChatDetected) reconnectOldChat();
  else requestNewChat();
}

//internal processes
function requestNewChat() {
  if (wssConnection == null || wssConnection.readyState !== WebSocket.OPEN)
    return;
  let messageToSend = JSON.parse(JSON.stringify(requestChatMessage));
  sentInitialMessages = false;
  messageToSend.body.requestTranscript = false;
  messageToSend.body.intrinsics = {
    email: customerDetails.mobile,
    country: "+966",
    skillset: "WC_Default_Skillset",
    phoneNumber: customerDetails.mobile,
    name: customerDetails.name,
    customFields: [
      {
        title: "note",
        value: customerDetails.note,
        title: "category",
        value: customerDetails.cat,
      },
    ],
  };
  wssConnection.send(JSON.stringify(messageToSend));
}

function reconnectOldChat() {
  console.log("trying to reconnect old chat");
  const oldGuid = window.localStorage.getItem("guid");
  const oldAuthenticationKey = window.localStorage.getItem("authenticationKey");
  let messageToSend = JSON.parse(JSON.stringify(requestChatMessage));
  messageToSend.body.guid = oldGuid;
  messageToSend.body.authenticationKey = oldAuthenticationKey;
  wssConnection.send(JSON.stringify(messageToSend));
}

export async function closeConversation(closingMessage) {
  sendChatMessage("Customer Ended the Chat, Bye");
  let messageToSend = JSON.parse(JSON.stringify(closeConversationMessage));
  wssConnection.send(JSON.stringify(messageToSend));
}

function wssNewMessageEventListener(e) {
  let wsMessageObject;
  try {
    wsMessageObject = JSON.parse(e.data);
  } catch (error) {
    console.error("failed to parse JSON message received from CC");
    return;
  }

  if (wsMessageObject == null || wsMessageObject.type == null) {
    console.error("parsed JSON message is null or has no type field");
    return;
  }

  if (wsMessageObject.type === "notification")
    processNotification(wsMessageObject);
  if (wsMessageObject.type === "acknowledgement")
    processAcknowledgement(wsMessageObject);
  if (wsMessageObject.type === "error") processError(wsMessageObject);
}

function processNotification(wsMessageObject) {
  if (wsMessageObject.body == null) return;
  if (wsMessageObject.body.method == null) return;

  switch (wsMessageObject.body.method) {
    case "requestChat":
      processRequestChatNotification(wsMessageObject);
      break;

    case "queueStatus":
      processQueueStatus(wsMessageObject);
      break;

    case "newParticipant":
      processNewParticipant(wsMessageObject);
      break;

    case "participantLeave":
      processParticipantLeave(wsMessageObject);
      break;

    case "isTyping":
      processIsTyping(wsMessageObject);
      break;

    case "newMessage":
      processNewMessage(wsMessageObject);
      break;
    case "closeConversation":
      processCloseConversation();
      break;
  }
}

function processRequestChatNotification(message) {
  if (oldChatDetected) {
    console.log("reconnected to old chat....");
    store.dispatch(setChatStarted(true));
    startExpiaryCounter();
    store.dispatch(setInitialized(true));
    store.dispatch(setConnectedToOldChat(true));
    store.dispatch(
      pushMessage({
        textId: -100,
        text: "مرحبا بكم في المحادثة الفورية لخدمة عملاء المنصة الوطنية الموحدة للتوظيف جدارات",
        type: "success",
      })
    );
    startPing();
    return;
  }

  window.localStorage.setItem("guid", message.body.guid);
  window.localStorage.setItem(
    "authenticationKey",
    message.body.authenticationKey
  );
}

function processQueueStatus(message) {}

function processNewParticipant(wsMessageObject) {
  if (!oldChatDetected) {
    store.dispatch(setChatStarted(true));
    startPing();
    // startExpiaryCounter();
    if (!participantJoined) {
      participantJoined = true;
      store.dispatch(
        pushMessage({
          id: -100,
          text: "مرحبا بكم في المحادثة الفورية لخدمة عملاء المنصة الوطنية الموحدة للتوظيف جدارات",
          type: "success",
        })
      );
    }
    if (!sentInitialMessages) {
      sentInitialMessages = true;
      sendInitialMessages();
    }
  }
}

function processParticipantLeave(wsMessageObject) {
  if (
    wsMessageObject.body.endChatFlag != null &&
    wsMessageObject.body.endChatFlag
  ) {
    wssConnection.close();
    store.dispatch(setChatEnded(true));
    window.localStorage.removeItem("guid");
    window.localStorage.removeItem("authenticationKey");

    store.dispatch(
      pushMessage({
        textId: -11,
        text: "انتهت المحادثة",
        type: "alert",
        senderType: "agent",
      })
    );

    store.dispatch(
      pushMessage({
        textId: -13,
        text: "restart chat",
        type: "restart-chat",
      })
    );
  }
}

function processIsTyping(message) {}

function processNewMessage(message) {
  store.dispatch(
    pushMessage({
      type: "message",
      senderType: "agent",
      text: message.body.message,
    })
  );
}

function processError(message) {
  if (message.body.code === 2) {
    if (oldChatDetected) {
      window.localStorage.removeItem("guid");
      window.localStorage.removeItem("authenticationKey");
      oldChatDetected = false;
      if (
        wssConnection != null &&
        wssConnection.readyState !== WebSocket.CLOSED
      )
        wssConnection.close();
      store.dispatch(setInitialized(true));
    }
  } else if (message.body.code === 500) {
    console.error("CC returned Internal Server Error 500 ...");
    store.dispatch(setInternalServerError(true));
    window.location.reload();
  }
}

//external processes
export function requestQueueStatus() {
  if (wssConnection?.readyState === WebSocket.OPEN)
    wssConnection.send(JSON.stringify(requestQueueStatusMessage));
}

export function sendChatMessage(messageToSend) {
  startExpiaryCounter();
  let message = JSON.parse(JSON.stringify(requestNewMessage));
  message.body.message = messageToSend;
  if (wssConnection?.readyState === WebSocket.OPEN)
    wssConnection.send(JSON.stringify(message));
}

export function sendInitialMessages() {
  return;
}

function processCloseConversation() {
  store.dispatch(setChatEnded(true));

  oldChatDetected = false;
  requestedToCheckOldChat = false;
  sentInitialMessages = false;

  if (wssConnection != null && wssConnection.readyState !== WebSocket.CLOSED) {
    wssConnection.close();
    wssConnection = null;
  }
  window.localStorage.removeItem("guid");
  window.localStorage.removeItem("authenticationKey");

  store.dispatch(
    pushMessage({
      textId: -11,
      text: "انتهت المحادثة",
      type: "alert",
      senderType: "agent",
    })
  );

  store.dispatch(
    pushMessage({
      textId: -13,
      text: "restart chat",
      type: "restart-chat",
    })
  );
}

function processAcknowledgement(message) {
  switch (message.body.method) {
    case "newMessage":
      processAckNewMessage(message);
      return;
  }
}

function processAckNewMessage(message) {
  if (message.body.accepted) {
    console.log("new message accepted...");
  }
}
export function startExpiaryCounter() {
  // if (expiaryTimer != null) {
  //   console.log("clearing chat expiary interval");
  //   clearInterval(expiaryTimer);
  //   expiaryTimer = null;
  // }
  // console.log("starting chat expiary interval");
  // chatStartedAt = Date.now();
  // expiaryTimer = setInterval(() => {
  //   if ((Date.now() - chatStartedAt) / 1000 > chatExpairyIntervalInSecs) {
  //     console.log("CHAT TIMER EXPIRED");
  //     if (
  //       !store.getState().avaya.chatEnded &&
  //       !store.getState().avaya.disableExpireTimer
  //     ) {
  //       store.dispatch(setChatExpired(true));
  //     }
  //     clearInterval(expiaryTimer);
  //     expiaryTimer = null;
  //   }
  // }, 500);
}

function startPing() {
  setInterval(() => {
    console.log("pinging...");
  }, 10000);
}
