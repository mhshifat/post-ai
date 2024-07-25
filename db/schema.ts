import { relations } from "drizzle-orm";
import { boolean, date, numeric, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

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
  campaigns: many(campaigns),
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
  qAndAs: many(qAndAs),
  customers: many(customers),
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

export const qAndAs = pgTable("questions_answers", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer"),
  type: text("type").default("Q&S"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const qAndAsRelations = relations(qAndAs, ({ one, many }) => ({
  domain: one(domains, {
    fields: [qAndAs.domainId],
    references: [domains.id]
  }),
  surveys: many(surveys)
}));

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

export const appointments = pgTable("appointments", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  time: text("time").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  domain: one(domains, {
    fields: [appointments.domainId],
    references: [domains.id]
  }),
}));

export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  default_template: text("default_template").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id]
  }),
  customers: many(customers),
}));

export const surveys = pgTable("surveys", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  questionId: text("question_id").notNull().references(() => qAndAs.id, { onDelete: "cascade" }),
  customerId: text("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const surveysRelations = relations(surveys, ({ one, many }) => ({
  domain: one(domains, {
    fields: [surveys.domainId],
    references: [domains.id]
  }),
  question: one(qAndAs, {
    fields: [surveys.questionId],
    references: [qAndAs.id]
  }),
  customer: one(customers, {
    fields: [surveys.customerId],
    references: [customers.id]
  }),
}));

export const threads = pgTable("threads", {
  id: text("id").primaryKey(),
  domainId: text("domain_id").notNull().references(() => domains.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  isLive: boolean("is_live").default(false),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const threadsRelations = relations(threads, ({ one, many }) => ({
  domain: one(domains, {
    fields: [threads.domainId],
    references: [domains.id]
  }),
  messages: many(messages),
}));

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull().references(() => threads.id, { onDelete: "cascade" }),
  senderId: text("sender_id").notNull(),
  recipientId: text("recipient_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  thread: one(threads, {
    fields: [messages.threadId],
    references: [threads.id]
  }),
}));