import ConversationsSidebar from "@/components/modules/conversations/conversations-sidebar";
import { PropsWithChildren } from "react";

export default function ConversationsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 h-full flex items-start">
      <ConversationsSidebar />
      {children}
    </div>
  )
}