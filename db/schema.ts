import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  accountType: text("account_type").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  domains: many(domains)
}));

export const domains = pgTable("domains", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  logo: text("logo").notNull(),
  domain: text("domain").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const domainsRelations = relations(domains, ({ one }) => ({
  user: one(users, {
    fields: [domains.userId],
    references: [users.id]
  })
}));