import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { IConnectionType } from "@/utils/types";

export const connections = pgTable("connections", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull().default(IConnectionType.STRIPE),
  accountId: text("account_id").notNull(),
  metadata: text("metadata").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
}, (t) => ({
  unq: unique().on(t.userId, t.type),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, {
    fields: [connections.userId],
    references: [users.id]
  })
}));