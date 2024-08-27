"use server";

import { db } from "@/db/drizzle";
import { ICampaign, ICustomer, ICustomerToCampaign } from "@/utils/types";
import { and, desc, eq, inArray } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";
import { campaigns } from "@/db/schema/campaign";
import { customersToCampaigns } from "@/db/schema/customers-to-campaigns";
import { customers } from "@/db/schema/customer";
import { mailService } from "@/infra/email";

export async function createCampaign(payload: Partial<ICampaign>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(campaigns)
    .values({
      id: v4(),
      userId: user.id!,
      title: payload.title!,
      default_template: payload.default_template!,
      createdAt: new Date()
    })
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function updateCampaign(payload: Partial<ICampaign>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(campaigns)
    .set({
      default_template: payload.default_template!,
      updatedAt: new Date()
    })
    .where(
      eq(campaigns.id, payload.id!)
    )
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function deleteCampaign(campaignId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .delete(campaigns)
    .where(
      eq(campaigns.id, campaignId!)
    )
    .returning({ id: campaigns.id })
    .execute();

  return data;
}

export async function getCampaigns() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: campaigns.id,
      userId: campaigns.userId,
      title: campaigns.title,
      default_template: campaigns.default_template,
      createdAt: campaigns.createdAt,
      customersToCampaigns: customersToCampaigns,
    })
    .from(campaigns)
    .leftJoin(customersToCampaigns, eq(customersToCampaigns.campaignId, campaigns.id))
    .where(
      eq(campaigns.userId, user.id),
    )
    .orderBy(desc(campaigns.createdAt));
  
  return data.reduce<(Partial<ICampaign> & { customersToCampaigns: ICustomerToCampaign[] })[]>((acc, val) => {
    if (!acc.some(item => (item as { id: string }).id === val.id)) acc.push({
      ...val,
      customersToCampaigns: [val.customersToCampaigns as unknown as ICustomerToCampaign]?.filter(Boolean),
    });
    else {
      const idx = acc.findIndex(item => item.id === val.id);
      const record = acc[idx];
      record?.customersToCampaigns?.push(val.customersToCampaigns as unknown as ICustomerToCampaign)
    }
    return acc;
  }, []);
}

export async function getCampaignById(campaignId: string) {
  const user = await getUserDetails();
  if (!user) throw new Error("User not found");
  const [data] = await db
    .select({
      id: campaigns.id,
      userId: campaigns.userId,
      title: campaigns.title,
      default_template: campaigns.default_template,
      createdAt: campaigns.createdAt,
    })
    .from(campaigns)
    .where(
      and(
        eq(campaigns.userId, user.id),
        eq(campaigns.id, campaignId),
      )
    )
    .orderBy(desc(campaigns.createdAt));

  return data;
}

export async function getCampaignWithCustomersById(campaignId: string) {
  const user = await getUserDetails();
  if (!user) throw new Error("User not found");
  const data = await db
    .select({
      id: campaigns.id,
      userId: campaigns.userId,
      title: campaigns.title,
      default_template: campaigns.default_template,
      createdAt: campaigns.createdAt,
      customersToCampaigns: customersToCampaigns,
      customer: customers,
    })
    .from(campaigns)
    .leftJoin(customersToCampaigns, eq(customersToCampaigns.campaignId, campaigns.id))
    .leftJoin(customers, eq(customersToCampaigns.customerId, customers.id))
    .where(
      and(
        eq(campaigns.userId, user.id),
        eq(campaigns.id, campaignId),
      )
    )
    .orderBy(desc(campaigns.createdAt));
    
  return data.reduce<(Partial<ICampaign> & { customersToCampaigns: ICustomerToCampaign[]; customers: ICustomer[] })[]>((acc, val) => {
    if (!acc.some(item => (item as { id: string }).id)) acc.push({
      ...val,
      customersToCampaigns: [val.customersToCampaigns as unknown as ICustomerToCampaign],
      customers: [val.customer!]
    });
    else {
      const idx = acc.findIndex(item => item.id === val.id);
      const record = acc[idx];
      record?.customersToCampaigns?.push(val.customersToCampaigns as unknown as ICustomerToCampaign)
      record.customers.push(val.customer!)
    }
    return acc;
  }, [])[0];
}

export async function addCustomersToCampaigns(campaignId: string, customers: string[]) {
  const user = await getUserDetails();
  if (!user) return;
  const campaign = await getCampaignById(campaignId);
  if (!campaign) throw new Error("Campaign not found!");
  const customersAddedToCampaigns = await db
    .select({
      campaignId: customersToCampaigns.campaignId,
      customerId: customersToCampaigns.customerId,
    })
    .from(customersToCampaigns)
    .where(
      and(
        eq(customersToCampaigns.campaignId, campaignId),
        inArray(customersToCampaigns.customerId, customers)
      )
    );
  const customersNotAddedToCampaigns = customers.filter(cId => !customersAddedToCampaigns.some(item => item.customerId === cId));
  await Promise.all(
    customersNotAddedToCampaigns.map(cId => db
      .insert(customersToCampaigns)
      .values({
        campaignId: campaign.id,
        customerId: cId
      })
      .returning({
        campaignId: customersToCampaigns.campaignId,
        customerId: customersToCampaigns.customerId,
      })
    )
  );
}

export async function sendEmailToCampaignUsers(campaignId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const campaign = await getCampaignWithCustomersById(campaignId);
  if (!campaign) throw new Error("Campaign not found!");
  await Promise.allSettled(
    campaign.customers.map(c => mailService.sendEmail(c.email, campaign.title!, campaign.default_template!))
  );
}