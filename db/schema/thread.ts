import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";
import { messages } from "./message";

export const threads = pgTable("threads", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isLive: boolean("is_live").default(false),
  status: text("status").default("DRAFT"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const threadsRelations = relations(threads, ({ one, many }) => ({
  domain: one(domains, {
    fields: [threads.domainId],
    references: [domains.id]
  }),
  messages: many(messages),
}));