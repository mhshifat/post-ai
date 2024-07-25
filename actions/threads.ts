import { IThread } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { threads } from "@/db/schema";
import { v4 } from "uuid";
import { and, desc, eq } from "drizzle-orm";
import { pusherServerClient } from "@/lib/pusher";
import { unstable_noStore } from "next/cache";

export async function createThread(payload: Partial<IThread>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .insert(threads)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      title: payload.title!,
      isLive: payload.isLive!,
      createdAt: new Date(),
    })
    .returning({
      id: threads.id,
      createdAt: threads.createdAt,
      domainId: threads.domainId,
      title: threads.title,
      isLive: threads.isLive,
    })
    .execute();

  return data;
}

export async function updateThread(payload: Partial<IThread>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .update(threads)
    .set({
      title: payload.title!,
      isLive: payload.isLive!,
      updatedAt: new Date(),
    })
    .where(eq(threads.id, payload.id!))
    .returning({
      id: threads.id,
      createdAt: threads.createdAt,
      domainId: threads.domainId,
      title: threads.title,
      isLive: threads.isLive,
    })
    .execute();

  pusherServerClient.trigger(data.id, "switch-live-mode", { checked: payload.isLive });
  return data;
}

export async function getThreadDetails(threadId: string) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .select({
      id: threads.id,
      title: threads.title,
      isLive: threads.isLive,
      createdAt: threads.createdAt,
    })
    .from(threads)
    .where(eq(threads.id, threadId))

  return data;
}

export async function getThreads(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: threads.id,
      title: threads.title,
      domainId: threads.domainId,
      createdAt: threads.createdAt,
    })
    .from(threads)
    .where(
      and(
        eq(threads.domainId, domainId),
      )
    )
    .orderBy(desc(threads.createdAt));
  return data;
}