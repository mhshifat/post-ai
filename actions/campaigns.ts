"use server";

import { db } from "@/db/drizzle";
import { campaigns } from "@/db/schema/";
import { ICampaign } from "@/utils/types";
import { desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";

export async function createCampaign(payload: Partial<ICampaign>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(campaigns)
    .values({
      id: v4(),
      userId: user.id!,
      title: payload.title!,
      default_template: payload.default_template!,
      createdAt: new Date()
    })
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function updateCampaign(payload: Partial<ICampaign>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(campaigns)
    .set({
      default_template: payload.default_template!,
      updatedAt: new Date()
    })
    .where(
      eq(campaigns.id, payload.id!)
    )
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function deleteCampaign(campaignId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .delete(campaigns)
    .where(
      eq(campaigns.id, campaignId!)
    )
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function getCampaigns() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: campaigns.id,
      userId: campaigns.userId,
      title: campaigns.title,
      default_template: campaigns.default_template,
      createdAt: campaigns.createdAt,
    })
    .from(campaigns)
    .where(
      eq(campaigns.userId, user.id),
    )
    .orderBy(desc(campaigns.createdAt));

  return data;
}
