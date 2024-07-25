import { IMessage } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { messages } from "@/db/schema";
import { v4 } from "uuid";
import { pusherServerClient } from "@/lib/pusher";
import { unstable_noStore } from "next/cache";
import { and, desc, eq } from "drizzle-orm";

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

export async function createMessage(payload: Partial<IMessage>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .insert(messages)
    .values({
      id: v4(),
      threadId: payload.threadId!,
      recipientId: payload.recipientId!,
      senderId: payload.senderId!,
      content: payload.content!,
      createdAt: new Date(),
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

  pusherServerClient.trigger(data.threadId, "new-message", {
    data
  })
  return data;
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