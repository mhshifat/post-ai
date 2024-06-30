import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  accountType: text("account_type").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});