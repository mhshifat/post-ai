import { ICustomer } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { customers, domains } from "@/db/schema/";
import { v4 } from "uuid";
import { desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function createCustomer(payload: Partial<ICustomer>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .insert(customers)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      email: payload.email!,
      createdAt: new Date(),
    })
    .returning({
      id: customers.id,
      createdAt: customers.createdAt,
      domainId: customers.domainId,
      email: customers.email,
    })
    .execute();

  return data;
}

export async function updateCustomer(payload: Partial<ICustomer>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .update(customers)
    .set({
      email: payload.email!,
      updatedAt: new Date(),
    })
    .where(
      eq(customers.id, payload.id!)
    )
    .returning({
      id: customers.id,
      createdAt: customers.createdAt,
      domainId: customers.domainId,
      email: customers.email,
    })
    .execute();

  return data;
}

export async function getCustomers() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: customers.id,
      createdAt: customers.createdAt,
      domainId: customers.domainId,
      email: customers.email,
      domain: domains,
    })
    .from(customers)
    .leftJoin(domains, eq(domains.id, customers.domainId))
    .where(
      eq(domains.userId, user.id)
    )
    .orderBy(desc(customers.createdAt));

  return data;
}