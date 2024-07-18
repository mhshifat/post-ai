import { relations } from "drizzle-orm";
import { numeric, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

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
  domains: many(domains),
  connections: many(connections),
}));

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
}));

export const connections = pgTable("connections", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),
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

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  price: numeric("price").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const productsRelations = relations(products, ({ one }) => ({
  domain: one(domains, {
    fields: [products.domainId],
    references: [domains.id]
  })
}));

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