"use server";

import { db } from "@/db/drizzle";
import { connections } from "@/db/schema/connection";
import { users } from "@/db/schema/user";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { getUserDetails } from "./users";
import { IConnection, IConnectionType } from "@/utils/types";
import { v4 } from "uuid";
import { getDomainDetails } from "./domains";

export async function getConnections() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: connections.id,
      userId: connections.userId,
      metadata: connections.metadata,
      accountId: connections.accountId,
      type: connections.type,
    })
    .from(connections)
    .leftJoin(users, eq(users.id, connections.userId))
    .where(
      eq(connections.userId, user.id)
    )
    .orderBy(desc(connections.createdAt));

  return data;
}

export async function getConnectionsByDomain(domainId: string) {
  unstable_noStore();

  const domain = await getDomainDetails(domainId);
  if (!domain) return [];
  const data = await db
    .select({
      id: connections.id,
      userId: connections.userId,
      accountId: connections.accountId,
      metadata: connections.metadata,
      type: connections.type,
    })
    .from(connections)
    .leftJoin(users, eq(users.id, connections.userId))
    .where(
      eq(connections.userId, domain.userId)
    )
    .orderBy(desc(connections.createdAt));

  return data;
}

export async function getConnectionBy(args: {
  type: IConnectionType;
  userId: string;
}) {
  const [data] = await db
    .select({
      id: connections.id,
      accountId: connections.accountId,
      metadata: connections.metadata,
    })
    .from(connections)
    .leftJoin(users, eq(users.id, connections.userId))
    .where(
      and(
        eq(connections.userId, args.userId),
        eq(connections.type, args.type)
      )
    );
  
  return data;
}

export async function createConnection(payload: Partial<IConnection>) {
  const [data] = await db
    .insert(connections)
    .values({
      id: v4(),
      accountId: payload.accountId!,
      metadata: payload.metadata!,
      userId: payload.userId!,
      type: payload.type,
      createdAt: new Date()
    })
    .returning({
      id: connections.id,
    });
  
  return data;
}