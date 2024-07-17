import ChatContents from "./chat-contents";
import ChatTabs from "./chat-tabs";
import MessengerHeader from "./messenger-header";

export default function ChatMessenger() {
  return (
    <div className="w-[99%] max-w-[400px] max-h-[600px] h-full shadow-md rounded-lg bg-background flex flex-col">
      <MessengerHeader />
      <ChatTabs />
    </div>
  )
}