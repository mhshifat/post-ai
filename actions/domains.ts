"use server";

import { db } from "@/db/drizzle";
import { bots, domains } from "@/db/schema";
import { IDomain } from "@/utils/types";
import { and, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";
import { upsertBot } from "./bots";

export async function createDomain(payload: Pick<IDomain, "domain" | "logo">) {
  const user = await getUserDetails();
  if (!user) return;
  const result = await db.transaction(async (tx) => {
    const [data] = await db
      .insert(domains)
      .values({
        id: v4(),
        userId: user.id,
        domain: payload.domain,
        logo: payload.logo,
        createdAt: new Date()
      })
      .returning({
        id: domains.id,
        domain: domains.domain,
        logo: domains.logo,
        createdAt: domains.createdAt,
      })
      .execute();
      
    await upsertBot({
      logo: payload.logo,
      domainId: data.id,
      welcomeText: "Hello there, how may i help you?"
    });

    return data;
  })
  return result;
}

export async function updateDomain(domainId: string, payload: Pick<IDomain, "domain" | "logo">) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(domains)
    .set({
      domain: payload.domain,
      logo: payload.logo,
      updatedAt: new Date()
    })
    .where(
      and(
        eq(domains.id, domainId),
        eq(domains.userId, user.id),
      )
    )
    .returning({
      id: domains.id,
      domain: domains.domain,
      logo: domains.logo,
      createdAt: domains.createdAt,
    })
    .execute();

  return data;
}

export async function getDomainDetails(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .select({
      id: domains.id,
      domain: domains.domain,
      logo: domains.logo,
      updatedAt: domains.updatedAt,
      bot: bots
    })
    .from(domains)
    .leftJoin(bots, eq(bots.domainId, domainId))
    .where(
      and(
        eq(domains.id, domainId),
        eq(domains.userId, user.id)
      )
    );
  return data;
}

export async function deleteDomain(domainId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .delete(domains)
    .where(
      and(
        eq(domains.id, domainId),
        eq(domains.userId, user.id)
      )
    )
    .returning({ id: domains.id });

  return data;
}
