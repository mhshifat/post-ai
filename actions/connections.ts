"use server";

import { db } from "@/db/drizzle";
import { connections, users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getConnections() {
  unstable_noStore();

  const user = await currentUser();
  if (!user) return;
  const data = await db
    .select({
      id: connections.id,
      userId: connections.userId,
      metadata: connections.metadata,
      type: connections.type,
    })
    .from(connections)
    .leftJoin(users, eq(users.id, connections.userId))
    .where(
      eq(connections.userId, users.id)
    )
    .orderBy(desc(connections.createdAt));

  return data;
}