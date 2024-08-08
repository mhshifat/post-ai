import { getAppointments } from '@/actions/appointments';
import { getBlogs } from '@/actions/blogs';
import { getCampaigns } from '@/actions/campaigns';
import { getConnections } from '@/actions/connections';
import { getCustomers } from '@/actions/customers';
import { getNotificationsByUser } from '@/actions/notifications';
import { getDomains, getProducts } from '@/actions/products';
import { appointments } from '@/db/schema/appointment';
import { blogs } from '@/db/schema/blog';
import { bots } from '@/db/schema/bot';
import { campaigns } from '@/db/schema/campaign';
import { connections } from '@/db/schema/connection';
import { customers } from '@/db/schema/customer';
import { customersToCampaigns } from '@/db/schema/customers-to-campaigns';
import { domains } from '@/db/schema/domain';
import { faqs } from '@/db/schema/faq';
import { messages } from '@/db/schema/message';
import { notifications } from '@/db/schema/notification';
import { products } from '@/db/schema/product';
import { surveys } from '@/db/schema/survey';
import { surveyQuestions } from '@/db/schema/survey-question';
import { threads } from '@/db/schema/thread';
import { InferSelectModel } from 'drizzle-orm';
import Stripe from 'stripe';

export type IConnection = Omit<InferSelectModel<typeof connections>, "updatedAt"> & { updatedAt?: Date };
export type IDomain = InferSelectModel<typeof domains>;
export type IFaq = InferSelectModel<typeof faqs>;
export type ISurvey = InferSelectModel<typeof surveys>;
export type ISurveyQuestion = InferSelectModel<typeof surveyQuestions>;
export type ICampaign = InferSelectModel<typeof campaigns>;
export type ICustomerToCampaign = InferSelectModel<typeof customersToCampaigns>;
export type IAppointment = InferSelectModel<typeof appointments>;
export type IBlog = InferSelectModel<typeof blogs>;
export type INotification = InferSelectModel<typeof notifications>;
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
export type ICampaignsWithCustomers = Awaited<ReturnType<typeof getCampaigns>>;
export type INotificationsWithUser = Awaited<ReturnType<typeof getNotificationsByUser>>;
export type IBlogsWithUser = Awaited<ReturnType<typeof getBlogs>>;
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
export enum IConnectionType {
  STRIPE = 'STRIPE',
  GOOGLE_MEET = 'GOOGLE_MEET',
}
