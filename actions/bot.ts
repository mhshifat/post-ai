"use server";

import { db } from "@/db/drizzle";
import { bots } from "@/db/schema";
import { IChatBot } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import { v4 } from "uuid";

export async function upsertBot(payload: Partial<IChatBot>) {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const payloadData = {
    logo: payload.logo!,
    welcomeText: payload.welcomeText!,
  }
  const [data] = await db
    .insert(bots)
    .values({
      id: payload.id || v4(),
      domainId: payload.domainId!,
      ...payloadData,
      createdAt: new Date()
    })
    .onConflictDoUpdate({
      target: bots.id,
      set: {
        ...payloadData,
        updatedAt: new Date()
      }
    })
    .returning({ id: bots.id })
    .execute();

  return data;
}