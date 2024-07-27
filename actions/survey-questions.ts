"use server";

import { db } from "@/db/drizzle";
import { surveyQuestions } from "@/db/schema/survey-question";
import { ISurveyQuestion } from "@/utils/types";
import { eq } from "drizzle-orm";
import { getUserDetails } from "./users";
import { v4 } from "uuid";

export async function createSurveyQuestion(payload: Partial<ISurveyQuestion>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(surveyQuestions)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      question: payload.question!,
      createdAt: new Date()
    })
    .returning({ id: surveyQuestions.id });

  return data;
}

export async function getSurveyQuestions(domainId: string) {
  const data = await db
    .select({
      id: surveyQuestions.id,
      domainId: surveyQuestions.domainId,
      question: surveyQuestions.question,
    })
    .from(surveyQuestions)
    .where(
      eq(surveyQuestions.domainId, domainId)
    );
  
  return data;
}