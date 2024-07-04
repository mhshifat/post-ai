import ChatBotWindow from "@/components/modules/chatbot/chat-bot-window";
import ClientOnly from "@/components/ui/client-only";

export default function Chatbot() {
  return (
    <ClientOnly>
      <ChatBotWindow />
    </ClientOnly>
  )
}