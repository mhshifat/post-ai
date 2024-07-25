import { numeric, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { domains } from "./domain";

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