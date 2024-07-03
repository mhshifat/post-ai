import ChatInfo from "./chat-info";
import ChatInput from "./chat-input";
import ChatLists from "./chat-lists";

export default function ChatWindow() {
  return (
    <div className="w-full flex flex-col h-full">
      <ChatInfo />
      <ChatLists />
      <ChatInput />
    </div>
  )
}