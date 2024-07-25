"use client";

import BotProvider from "@/components/providers/bot-provider";
import ChatInfo from "./chat-info";
import { useSearchParams } from "next/navigation";
import ChatLists from "./chat-lists";
import ChatInput from "./chat-input";
import NotFound from "@/components/shared/not-found";

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const domainId = searchParams.get("domain");
  const threadId = searchParams.get("thread");

  return (
    <div className="w-full flex flex-col h-full">
      {threadId && (
        <BotProvider
          domainId={domainId}
          threadId={threadId}
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