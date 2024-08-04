import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { customers } from "./customer";
import { campaigns } from "./campaign";
import { relations } from "drizzle-orm";

export const customersToCampaigns = pgTable(
  'customers_to_campaigns',
  {
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id),
    campaignId: text('campaign_id')
      .notNull()
      .references(() => campaigns.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.customerId, t.campaignId] }),
  }),
);

export const customersToCampaignsRelations = relations(customersToCampaigns, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [customersToCampaigns.campaignId],
    references: [campaigns.id],
  }),
  customer: one(customers, {
    fields: [customersToCampaigns.customerId],
    references: [customers.id],
  }),
}));