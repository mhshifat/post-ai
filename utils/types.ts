import { getConnections } from '@/actions/connections';
import { getDomains, getProducts } from '@/actions/domains';
import { domains, products } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import Stripe from 'stripe';

export type IDomain = InferSelectModel<typeof domains>;
export type IProduct = InferSelectModel<typeof products>;
export type IDomainsWithUserId = Awaited<ReturnType<typeof getDomains>>;
export type IConnectionsWithUserId = Awaited<ReturnType<typeof getConnections>>;
export type IProductsWithDomainId = Awaited<ReturnType<typeof getProducts>>;
export type IPlans = "STANDARD" | "PRO" | "ULTIMATE";
export type IThemes = "SYSTEM" | "DARK" | "LIGHT";
export type IStripeSubScriptionWithPlan = Stripe.Subscription & {
  plan: {
    id: string;
    active: boolean;
    amount: string;
    currency: string;
    metadata: Record<string, unknown>;
    nickname: string;
    product: string;
  }
};