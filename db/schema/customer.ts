import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";
import { campaigns } from "./campaign";
import { appointments } from "./appointment";

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
  appointments: many(appointments),
}));