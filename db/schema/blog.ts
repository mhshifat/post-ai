import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./user";

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey(),
  // userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  thumbnail: text("thumbnail").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id]
  }),
}));