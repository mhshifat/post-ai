import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";
import { surveys } from "./survey";

export const surveyQuestions = pgTable("survey_questions", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const surveyQuestionsRelations = relations(surveyQuestions, ({ one, many }) => ({
  domain: one(domains, {
    fields: [surveyQuestions.domainId],
    references: [domains.id]
  }),
  surveys: many(surveys)
}));