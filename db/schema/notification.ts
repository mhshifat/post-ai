import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  seen: boolean("seen").default(false),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  domain: one(domains, {
    fields: [notifications.domainId],
    references: [domains.id]
  }),
}));