"use server";

import { db } from "@/db/drizzle";
import { bots } from "@/db/schema";
import { IChatBot } from "@/utils/types";
import { v4 } from "uuid";
import { getUserDetails } from "./users";

export async function upsertBot(payload: Partial<IChatBot>) {
  const user = await getUserDetails();
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