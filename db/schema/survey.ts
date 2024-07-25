import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { customers } from "./customer";
import { domains } from "./domain";
import { surveyQuestions } from "./survey-question";

export const surveys = pgTable("surveys", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  surveyQuestionId: text("survey_question_id").notNull().references(() => surveyQuestions.id, { onDelete: "cascade" }),
  customerId: text("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const surveysRelations = relations(surveys, ({ one, many }) => ({
  domain: one(domains, {
    fields: [surveys.domainId],
    references: [domains.id]
  }),
  surveyQuestion: one(surveyQuestions, {
    fields: [surveys.surveyQuestionId],
    references: [surveyQuestions.id]
  }),
  customer: one(customers, {
    fields: [surveys.customerId],
    references: [customers.id]
  }),
}));