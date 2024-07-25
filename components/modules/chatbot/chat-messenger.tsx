import ChatContents from "./chat-contents";
import ChatTabs from "./chat-tabs";
import MessengerHeader from "./messenger-header";

export default function ChatMessenger() {
  return (
    <div className="w-[99%] max-w-[400px] max-h-[600px] h-full shadow-xl rounded-xl bg-background flex flex-col overflow-hidden">
      <MessengerHeader />
      <ChatTabs />
    </div>
  )
}