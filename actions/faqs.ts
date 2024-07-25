"use server";

import { db } from "@/db/drizzle";
import { IFaq } from "@/utils/types";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";
import { faqs } from "@/db/schema/faq";
import { domains } from "@/db/schema/domain";

export async function createFaq(payload: Partial<IFaq>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(faqs)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      question: payload.question!,
      answer: payload.answer!,
      createdAt: new Date()
    })
    .returning({ id: faqs.id })
    .execute();

  return data;
}

export async function updateFaq(payload: Partial<IFaq>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(faqs)
    .set({
      answer: payload.answer!,
      updatedAt: new Date()
    })
    .where(
      eq(faqs.id, payload.id!)
    )
    .returning({ id: faqs.id })
    .execute();

  return data;
}

export async function getFaqs(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: faqs.id,
      domainId: faqs.domainId,
      question: faqs.question,
      answer: faqs.answer,
      createdAt: faqs.createdAt,
    })
    .from(faqs)
    .where(
      and(
        eq(faqs.domainId, domainId),
      ),
    )
    .orderBy(desc(faqs.createdAt));

  return data;
}

