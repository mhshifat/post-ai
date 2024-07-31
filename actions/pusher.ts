"use server";

import { pusherServerClient } from "@/lib/pusher";
import { v4 } from "uuid";

export async function startedTyping(payload: {
  domainId: string;
  recipientId: string;
  threadId: string;
  senderId: string;
}) {
  const tempId = v4();

  pusherServerClient.trigger(payload.domainId, `new-message-initiated:::::${payload.threadId}`, {
    id: tempId,
    threadId: payload.threadId,
    senderId: payload.senderId,
    recipientId: payload.recipientId,
    content: "...",
    createdAt: new Date(),
  });
}

export async function typingEnded(payload: {
  domainId: string;
  recipientId: string;
  threadId: string;
  senderId: string;
}) {
  const tempId = v4();

  pusherServerClient.trigger(payload.domainId, `new-message-typing-ended:::::${payload.threadId}`, {
    id: tempId,
    threadId: payload.threadId,
    senderId: payload.senderId,
    recipientId: payload.recipientId,
    content: "...",
    createdAt: new Date(),
  });
}

export async function updateLiveModeStatus(payload: {
  domainId: string;
  threadId: string;
  checked: boolean;
}) {
  console.log(payload.domainId, `live-mode-status:::::${payload.threadId}`);
  
  pusherServerClient.trigger(payload.domainId, `live-mode-status:::::${payload.threadId}`, {
    checked: payload.checked,
  });
}