import { getConnections } from '@/actions/connections';
import { getAppointments, getCustomers, getDomains, getProducts } from '@/actions/domains';
import { appointments, bots, campaigns, customers, domains, messages, products, qAndAs, surveys, threads } from '@/db/schema/';
import { InferSelectModel } from 'drizzle-orm';
import Stripe from 'stripe';

export type IDomain = InferSelectModel<typeof domains>;
export type IQuestion = InferSelectModel<typeof qAndAs>;
export type ISurvey = InferSelectModel<typeof surveys>;
export type ICampaign = InferSelectModel<typeof campaigns>;
export type IAppointment = InferSelectModel<typeof appointments>;
export type ICustomer = InferSelectModel<typeof customers>;
export type IThread = InferSelectModel<typeof threads>;
export type IChatBot = InferSelectModel<typeof bots>;
export type IProduct = InferSelectModel<typeof products>;
export type IMessage = InferSelectModel<typeof messages>;
export type IDomainsWithUserId = Awaited<ReturnType<typeof getDomains>>;
export type IConnectionsWithUserId = Awaited<ReturnType<typeof getConnections>>;
export type IProductsWithDomainId = Awaited<ReturnType<typeof getProducts>>;
export type ICustomerWithDomain = Awaited<ReturnType<typeof getCustomers>>;
export type IAppointmentWithDomain = Awaited<ReturnType<typeof getAppointments>>;
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
export type IUploaderFile = { id: string, url: string };