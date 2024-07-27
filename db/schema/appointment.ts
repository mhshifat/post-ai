import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";
import { customers } from "./customer";

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  customerId: text("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  time: text("time").notNull(),
  link: text("link"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  domain: one(domains, {
    fields: [appointments.domainId],
    references: [domains.id]
  }),
  customerId: one(customers, {
    fields: [appointments.customerId],
    references: [customers.id]
  }),
}));