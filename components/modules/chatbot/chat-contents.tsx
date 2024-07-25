import ChatInput from "../conversations/chat-input";
import ChatLists from "../conversations/chat-lists";

export default function ChatContents() {
  return (
    <div className="w-full h-full flex flex-col">
      <ChatLists className="py-2 px-3" />
      <ChatInput className="py-4 px-3" />
    </div>
  )
}