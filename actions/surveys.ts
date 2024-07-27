"use server";

import { db } from "@/db/drizzle";
import { surveys } from "@/db/schema/survey";
import { getUserDetails } from "./users";
import { ISurvey } from "@/utils/types";
import { v4 } from "uuid";
import { and, eq } from "drizzle-orm";

export async function createSurvey(payload: Partial<ISurvey>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(surveys)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      surveyQuestionId: payload.surveyQuestionId!,
      customerId: payload.customerId!,
      answer: payload.answer!,
      createdAt: new Date()
    })
    .returning({ id: surveys.id })
    .execute();

  return data;
}

export async function bulkUpsertSurveys(payloads: Partial<ISurvey>[]) {
  const user = await getUserDetails();
  if (!user) return null;
  for await (let payload of payloads) {
    const data = {
      customerId: payload.customerId!,
      surveyQuestionId: payload.surveyQuestionId!,
      answer: payload.answer!,
      domainId: payload.domainId!,
    }
    await db
      .insert(surveys)
      .values({
        id: payload.id || v4(),
        ...data,
        createdAt: new Date(),
      })
      .onConflictDoUpdate({
        target: surveys.id,
        set: {
          ...data,
          updatedAt: new Date()
        }
      })
      .returning({
        id: surveys.id,
      });
  }
}

export async function getSurveys(args: {
  customerId: string;
  domainId: string;
}) {
  const data = await db
    .select({
      id: surveys.id,
      domainId: surveys.domainId,
      answer: surveys.answer,
      customerId: surveys.customerId,
      surveyQuestionId: surveys.surveyQuestionId,
    })
    .from(surveys)
    .where(
      and(
        eq(surveys.customerId, args.customerId),
        eq(surveys.domainId, args.domainId),
      )
    );
  
  return data;
}