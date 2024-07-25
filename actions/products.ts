import { domains, products } from "@/db/schema/";
import { unstable_noStore } from "next/cache";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { IProduct } from "@/utils/types";
import { v4 } from "uuid";

export async function getDomains() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: domains.id,
      logo: domains.logo,
      domain: domains.domain,
      userId: domains.userId,
      createdAt: domains.createdAt,
    })
    .from(domains)
    .where(
      eq(domains.userId, user.id)
    )
    .orderBy(desc(domains.createdAt));

  return data;
}

export async function createProduct(payload: Pick<IProduct, "title" | "price" | "image" | "domainId">) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .insert(products)
    .values({
      id: v4(),
      domainId: payload.domainId,
      title: payload.title,
      image: payload.image,
      price: payload.price,
      createdAt: new Date()
    })
    .returning({ id: products.id })
    .execute();

  return data;
}

export async function getProducts(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return;
  const data = await db
    .select({
      id: products.id,
      domainId: domains.id,
      title: products.title,
      image: products.image,
      price: products.price,
    })
    .from(products)
    .leftJoin(domains, eq(domains.id, products.domainId))
    .where(
      eq(products.domainId, domainId)
    )
    .orderBy(desc(products.createdAt));

  return data;
}