import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";
import { surveys } from "./user";

export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const faqsRelations = relations(faqs, ({ one, many }) => ({
  domain: one(domains, {
    fields: [faqs.domainId],
    references: [domains.id]
  }),
  surveys: many(surveys)
}));