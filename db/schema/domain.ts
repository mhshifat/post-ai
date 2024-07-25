import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers, products, qAndAs, users } from "./user";
import { relations } from "drizzle-orm";

export const domains = pgTable("domains", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  logo: text("logo").notNull(),
  domain: text("domain").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const domainsRelations = relations(domains, ({ one, many }) => ({
  user: one(users, {
    fields: [domains.userId],
    references: [users.id]
  }),
  products: many(products),
  qAndAs: many(qAndAs),
  customers: many(customers),
}));