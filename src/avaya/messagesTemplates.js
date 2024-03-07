const errorReconnecting =
  "Unable to reconnect, session key is invalid or expired";

const deviceType = "atcomInterface v0.1";

export const requestChatMessage = {
  apiVersion: "1.0",
  type: "request",
  body: {
    method: "requestChat",
    deviceType: deviceType,
  },
};

export const requestQueueStatusMessage = {
  apiVersion: "1.0",
  type: "request",
  body: {
    method: "queueStatus",
  },
};

export const requestNewMessage = {
  apiVersion: "1.0",
  type: "request",
  body: {
    method: "newMessage",
  },
};

export const closeConversationMessage = {
  apiVersion: "1.0",
  type: "request",
  body: {
    method: "closeConversation",
  },
};
