"use server";

import { db } from "@/db/drizzle";
import { domains, qAndAs, surveys } from "@/db/schema";
import { IQuestion, ISurvey } from "@/utils/types";
import { and, desc, eq, isNotNull, isNull, ne } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";

export async function createSurvey(payload: Partial<ISurvey>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(surveys)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      questionId: payload.questionId!,
      customerId: payload.customerId!,
      answer: payload.answer!,
      createdAt: new Date()
    })
    .returning({ id: surveys.id })
    .execute();

  return data;
}

export async function createQuestion(payload: Partial<IQuestion>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(qAndAs)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      question: payload.question!,
      answer: payload.answer!,
      type: payload.type,
      createdAt: new Date()
    })
    .returning({ id: qAndAs.id })
    .execute();

  return data;
}

export async function updateQuestion(payload: Partial<IQuestion>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(qAndAs)
    .set({
      answer: payload.answer!,
      updatedAt: new Date()
    })
    .where(
      eq(qAndAs.id, payload.id!)
    )
    .returning({ id: qAndAs.id })
    .execute();

  return data;
}

export async function getHelpDeskQuestions(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: qAndAs.id,
      domainId: qAndAs.domainId,
      question: qAndAs.question,
      answer: qAndAs.answer,
      type: qAndAs.type,
      createdAt: qAndAs.createdAt,
    })
    .from(qAndAs)
    .where(
      and(
        eq(qAndAs.domainId, domainId),
        isNotNull(qAndAs.answer),
        eq(qAndAs.type, "Q&S")
      ),
    )
    .orderBy(desc(qAndAs.createdAt));

  return data;
}

export async function getFilterQuestions(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: qAndAs.id,
      domainId: qAndAs.domainId,
      question: qAndAs.question,
      answer: qAndAs.answer,
      type: qAndAs.type,
      createdAt: qAndAs.createdAt,
    })
    .from(qAndAs)
    .where(
      and(
        eq(qAndAs.domainId, domainId),
        eq(qAndAs.type, "FILTERED_QUESTIONS")
      ),
    )
    .orderBy(desc(qAndAs.createdAt));

  return data;
}

export async function getAllFilterQuestions() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: qAndAs.id,
      domainId: qAndAs.domainId,
      question: qAndAs.question,
      answer: qAndAs.answer,
      type: qAndAs.type,
      createdAt: qAndAs.createdAt,
      domain: domains,
    })
    .from(qAndAs)
    .leftJoin(domains, eq(domains.id, qAndAs.domainId))
    .where(
      and(
        eq(qAndAs.type, "FILTERED_QUESTIONS"),
        eq(domains.userId, user.id),
      ),
    )
    .orderBy(desc(qAndAs.createdAt));

  return data;
}

export async function getUnansweredFilterQuestions(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: qAndAs.id,
      domainId: qAndAs.domainId,
      question: qAndAs.question,
      answer: qAndAs.answer,
      type: qAndAs.type,
      createdAt: qAndAs.createdAt,
    })
    .from(qAndAs)
    .where(
      and(
        eq(qAndAs.domainId, domainId),
        eq(qAndAs.type, "FILTERED_QUESTIONS"),
        eq(qAndAs.answer, "")
      ),
    )
    .orderBy(desc(qAndAs.createdAt));

  return data;
}
