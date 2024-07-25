import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";

export const bots = pgTable("bots", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  logo: text("logo").notNull(),
  welcomeText: text("welcome_text").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const botsRelations = relations(bots, ({ one }) => ({
  domain: one(domains, {
    fields: [bots.domainId],
    references: [domains.id]
  }),
}));