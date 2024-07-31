"use server";

import { IMessage } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { v4 } from "uuid";
import { pusherServerClient } from "@/lib/pusher";
import { unstable_noStore } from "next/cache";
import { and, desc, eq } from "drizzle-orm";
import { messages } from "@/db/schema/message";
import { domains } from "@/db/schema/domain";
import { threads } from "@/db/schema/thread";
import { createThread } from "./threads";
import sleep from "@/utils/sleep";

export async function bulkCreateMessages(payloads: Partial<IMessage>[]) {
  const user = await getUserDetails();
  if (!user) return null;
  for await (let payload of payloads) {
    await db
      .insert(messages)
      .values({
        id: v4(),
        threadId: payload.threadId!,
        recipientId: payload.recipientId!,
        senderId: payload.senderId!,
        content: payload.content!,
        createdAt: payload.createdAt || new Date(),
      })
      .returning({
        id: messages.id,
        createdAt: messages.createdAt,
        content: messages.content,
        recipientId: messages.recipientId,
        senderId: messages.senderId,
        threadId: messages.threadId,
      })
      .execute();
  }
}

export async function createMessage(payload: Partial<IMessage> & { domainId: string }) {
  const tempId = payload?.id || v4();
  pusherServerClient.trigger(payload.domainId, `new-message-initiated:::::${payload.threadId}`, {
    id: tempId,
    threadId: payload.threadId,
    senderId: payload.senderId,
    recipientId: payload.recipientId,
    content: "...",
    createdAt: new Date(),
  });
  const result = await db.transaction(async (tx) => {
    const [domain] = await tx
      .select({
        id: domains.id,
      })
      .from(domains)
      .where(
        and(
          eq(domains.id, payload.domainId)
        )
      );
    if (!domain) throw new Error("Domain do not exist");
    let [thread] = await tx
      .select({
        id: threads.id,
      })
      .from(threads)
      .where(
        and(
          eq(threads.id, payload.threadId!),
          eq(threads.domainId, domain.id)
        )
      );
    if (!thread) {
      thread = await createThread({
        id: payload.threadId,
        domainId: domain.id,
        title: new Date().toISOString(),
      }, tx) as {
        id: string;
      };
    }
    
    const [message] = await tx
      .insert(messages)
      .values({
        id: v4(),
        content: payload.content!,
        senderId: payload.senderId!,
        recipientId: payload.recipientId!,
        createdAt: payload.createdAt || new Date(),
        threadId: payload.threadId!,
      })
      .returning({
        id: messages.id,
        content: messages.content,
        senderId: messages.senderId,
        recipientId: messages.recipientId,
        createdAt: messages.createdAt,
        threadId: messages.threadId,
      });

    return message;
  });
  await sleep(5000);
  pusherServerClient.trigger(payload.domainId, `new-message-sent:::::${payload.threadId}`, {
    id: tempId,
    threadId: result.threadId,
    senderId: result.senderId,
    recipientId: result.recipientId,
    content: result.content,
    createdAt: result.createdAt,
  });
  return result;
}

export async function getThreadMessages(threadId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return null;
  const data = await db
    .select({
      id: messages.id,
      content: messages.content,
      recipientId: messages.recipientId,
      senderId: messages.senderId,
      threadId: messages.threadId,
      createdAt: messages.createdAt,
    })
    .from(messages)
    .where(
      and(
        eq(messages.threadId, threadId),
      )
    )
    .orderBy(desc(messages.createdAt));
  return data;
}