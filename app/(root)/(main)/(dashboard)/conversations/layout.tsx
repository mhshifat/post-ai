import { getDomains } from "@/actions/products";
import ConversationsSidebar from "@/components/modules/conversations/conversations-sidebar";
import { PropsWithChildren } from "react";

export default async function ConversationsLayout({ children }: PropsWithChildren) {
  const domains = await getDomains();

  return (
    <div className="flex-1 h-full flex items-start">
      <ConversationsSidebar
        domains={domains}
      />
      {children}
    </div>
  )
}