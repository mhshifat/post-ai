import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { campaigns, users } from "./user";
import { relations } from "drizzle-orm";
import { domains } from "./domain";

export const customers = pgTable("customers", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  domain: one(domains, {
    fields: [customers.domainId],
    references: [domains.id]
  }),
  campaigns: many(campaigns),
}));