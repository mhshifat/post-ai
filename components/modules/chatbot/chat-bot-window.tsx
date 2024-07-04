"use client";

import { useEffect, useState } from "react";
import BotFloatingIcon from "./bot-floating-icon";
import ChatMessenger from "./chat-messenger";
import { cn } from "@/lib/utils";

export default function ChatBotWindow() {
  const [botOpened, setBotOpened] = useState(false);

  useEffect(() => {
    window?.parent?.postMessage(JSON.stringify({
      width: botOpened ? "400px" : "60px",
      height: botOpened ? "600px" : "60px",
    }), "*")
  }, [botOpened])

  return (
    <div className={cn("h-screen flex flex-col justify-end items-end gap-4 overflow-y-hidden", {
      "p-8": window.location === window.parent.location && window.location.origin === process.env.NEXT_PUBLIC_SITE_URL
    })}>
      {botOpened && <ChatMessenger />}
      <BotFloatingIcon
        onClick={() => setBotOpened(value => !value)}
      />
    </div>
  )
}