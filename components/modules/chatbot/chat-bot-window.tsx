"use client";

import { useEffect, useState } from "react";
import BotFloatingIcon from "./bot-floating-icon";
import ChatMessenger from "./chat-messenger";
import { cn } from "@/lib/utils";
import BotProvider from "@/components/providers/bot-provider";

export default function ChatBotWindow() {
  const [domainId, setDomainId] = useState<string | null>(null);
  const [botOpened, setBotOpened] = useState(false);

  useEffect(() => {
    window?.parent?.postMessage(JSON.stringify({
      width: botOpened ? "400px" : "60px",
      height: botOpened ? "700px" : "60px",
      rounded: botOpened ? "0" : "50%"
    }), "*")
  }, [botOpened])

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.origin === "null") {
        setDomainId(e.data);
      }
    })
  }, []);

  return (
    <div className={cn("h-screen flex flex-col justify-end items-end gap-4 overflow-y-hidden", {
      "p-8": window.location === window.parent.location && window.location.origin === process.env.NEXT_PUBLIC_SITE_URL
    })}>
      <BotProvider
        domainId={domainId}
        type="CHAT_BOT"
      >
        {botOpened && <ChatMessenger />}
        <BotFloatingIcon
          onClick={() => setBotOpened(value => !value)}
        />
      </BotProvider>
    </div>
  )
}