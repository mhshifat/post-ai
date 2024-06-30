"use server";

import { db } from "@/db/drizzle";
import { domains, users } from "@/db/schema";
import { IDomain } from "@/utils/types";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { unstable_cache, unstable_noStore } from "next/cache";
import { v4 } from 'uuid';

export async function createDomain(payload: Pick<IDomain, "domain" | "logo">) {
  const user = await currentUser();
  if (!user) return;
  const [data] = await db
    .insert(domains)
    .values({
      id: v4(),
      userId: user.privateMetadata?.userId as string,
      domain: payload.domain,
      logo: payload.logo,
      createdAt: new Date()
    })
    .returning({ id: users.id })
    .execute();

  return data;
}

export async function getDomains() {
  unstable_noStore();

  const user = await currentUser();
  if (!user) return;
  const data = await db
    .select({
      id: domains.id,
      userId: users.id,
      details: domains
    })
    .from(users)
    .leftJoin(domains, eq(domains.userId, users.id))
    .where(
      eq(users.clerkId, user.id)
    )
    .orderBy(desc(domains.createdAt));

  return data;
}