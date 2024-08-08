"use server";

import { db } from "@/db/drizzle";
import { INotification } from "@/utils/types";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";
import { notifications } from './../db/schema/notification';
import { domains } from "@/db/schema/domain";
import { users } from "@/db/schema/user";

export async function createNotification(payload: Partial<INotification>) {
  const result = await db.transaction(async (tx) => {
    const [data] = await tx
      .insert(notifications)
      .values({
        id: v4(),
        content: payload.content!,
        domainId: payload.domainId!,
        createdAt: new Date()
      })
      .returning({
        id: notifications.id,
        createdAt: notifications.createdAt,
      })
      .execute();
      
    return data;
  })
  return result;
}

export async function updateNotification(notificationId: string, payload: Partial<INotification>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(notifications)
    .set({
      content: payload.content,
      seen: payload.seen,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.domainId, payload.domainId!),
      )
    )
    .returning({
      id: notifications.id,
      createdAt: notifications.createdAt,
    })
    .execute();

  return data;
}

export async function getNotificationDetails(notificationId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .select({
      id: notifications.id,
      domainId: notifications.domainId!,
      content: notifications.content,
      seen: notifications.seen,
      updatedAt: notifications.updatedAt,
    })
    .from(notifications)
    .where(
      and(
        eq(notifications.id, notificationId),
      )
    );
  return data;
}

export async function getNotificationsByUser() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: notifications.id,
      createdAt: notifications.createdAt,
      content: notifications.content,
      seen: notifications.seen,
    })
    .from(notifications)
    .leftJoin(domains, eq(domains.id, notifications.domainId))
    .leftJoin(users, eq(users.id, domains.userId))
    .where(
      eq(domains.userId, user.id)
    )
    .orderBy(desc(notifications.createdAt));

  return data;
}

export async function deleteNotification(notificationId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .delete(notifications)
    .where(
      and(
        eq(notifications.id, notificationId),
      )
    )
    .returning({ id: notifications.id });

  return data;
}
