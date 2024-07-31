"use client";

import BotProvider from "@/components/providers/bot-provider";
import ChatInfo from "./chat-info";
import { useSearchParams } from "next/navigation";
import ChatLists from "./chat-lists";
import ChatInput from "./chat-input";
import NotFound from "@/components/shared/not-found";
import useThread from "@/components/hooks/use-thread";
import { useEffect, useState } from "react";

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const domainId = searchParams.get("domain");
  const threadId = searchParams.get("thread");
  const [customerId, setCustomerId] = useState<string | null>(null);
  if (!domainId || !threadId) return <NotFound />;
  const { fetchThreadDetails } = useThread({
    domainId: domainId
  });
  
  useEffect(() => {
    if (!threadId) return;
    fetchThreadDetails(threadId)
      .then((data) => {
        if (data?.message?.senderId) setCustomerId(data?.message?.senderId);
      })
  }, [threadId])

  return (
    <div className="w-full flex flex-col h-full">
      {threadId && (
        <BotProvider
          type="CUSTOMER_MESSAGES_WINDOW"
          domainId={domainId}
          threadId={threadId}
          customerId={customerId}
        >
          <ChatInfo />
          <ChatLists />
          <ChatInput />
        </BotProvider>
      )}
      {!threadId && (
        <NotFound title="Please select a thread to see the messages" />
      )}
    </div>
  )
}