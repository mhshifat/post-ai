"use server";

import { db } from "@/db/drizzle";
import { surveys } from "@/db/schema/survey";
import { getUserDetails } from "./users";
import { ISurvey } from "@/utils/types";
import { v4 } from "uuid";

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