import AgentBubble from "../bubbles/AgentBubble";
import CustomerBubble from "../bubbles/CustomerBubble";
import ErrorBubble from "../bubbles/ErrorBubble";
import InfoBubble from "../bubbles/InfoBubble";
import RestartChatBubble from "../bubbles/RestartChatBubble";
import StartChatBubble from "../bubbles/StartChatBubble";
import SuccessBubble from "../bubbles/SuccessBubble";

export default function ChatBubble(props) {
  return props.message.type === "message" ? (
    props.message.senderType === "agent" ? (
      <AgentBubble message={props.message} />
    ) : (
      <CustomerBubble message={props.message} />
    )
  ) : props.message.type === "start-chat" ? (
    <StartChatBubble></StartChatBubble>
  ) : props.message.type === "success" ? (
    <SuccessBubble message={props.message} />
  ) : props.message.type === "alert" ? (
    <ErrorBubble message={props.message}></ErrorBubble>
  ) : props.message.type === "info" ? (
    <InfoBubble message={props.message}></InfoBubble>
  ) : props.message.type === "restart-chat" ? (
    <RestartChatBubble message={props.message}></RestartChatBubble>
  ) : null;
}
