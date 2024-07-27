"use server";

import { IAppointment } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { v4 } from "uuid";
import { unstable_noStore } from "next/cache";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { endOfDay, startOfDay, addMinutes } from 'date-fns';
import { appointments } from "@/db/schema/appointment";
import { domains } from "@/db/schema/domain";
import { customers } from "@/db/schema/customer";
import { scheduleMeet } from "./google";
import { getDateWithTimestamp } from "@/utils/date";

export async function createAppointment(payload: Partial<IAppointment>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [customer] = await db
    .select({
      id: customers.id,
      email: customers.email,
      domainId: customers.domainId,
      domain: domains,
    })
    .from(customers)
    .leftJoin(domains, eq(domains.id, customers.domainId))
    .where(
      and(
        eq(customers.domainId, payload.domainId!),
        eq(customers.id, payload.customerId!),
      )
    );
  if (!customer) throw new Error("Invalid request");
  const res = await db.transaction(async () => {
    const [data] = await db
      .insert(appointments)
      .values({
        id: v4(),
        domainId: payload.domainId!,
        customerId: payload.customerId!,
        date: payload.date!,
        time: payload.time!,
        createdAt: new Date(),
      })
      .returning({
        id: appointments.id,
        createdAt: appointments.createdAt,
        domainId: appointments.domainId,
        customerId: appointments.customerId,
        date: appointments.date,
        time: appointments.time,
      });
    const date = getDateWithTimestamp(new Date(payload.date!), payload.time!, "Asia/Dhaka");
    const hangoutLink = await scheduleMeet({
      email: customer.email,
      date: {
        start: date,
        end: addMinutes(date, 30).toISOString(),
        timezone: "Asia/Dhaka"
      },
      title: "Product Demo",
      description: `An appointment has been scheduled with - ${customer.email} by ${customer.domain?.domain}`
    });
    await db
      .update(appointments)
      .set({
        link: hangoutLink
      })
      .returning({ id: appointments.id });

    return data;
  });

  return res;
}

export async function updateAppointment(payload: Partial<IAppointment>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .update(appointments)
    .set({
      date: payload.date!,
      time: payload.time!,
      updatedAt: new Date(),
    })
    .returning({
      id: appointments.id,
      createdAt: appointments.createdAt,
      domainId: appointments.domainId,
      date: appointments.date,
      time: appointments.time,
    })
    .execute();

  return data;
}

export async function getAppointments() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: appointments.id,
      createdAt: appointments.createdAt,
      domainId: appointments.domainId,
      date: appointments.date,
      time: appointments.time,
      domain: domains,
    })
    .from(appointments)
    .leftJoin(domains, eq(domains.id, appointments.domainId))
    .where(
      eq(domains.userId, user.id)
    )
    .orderBy(desc(appointments.createdAt));

  return data;
}

export async function getAppointmentsByDomain(domainId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: appointments.id,
      createdAt: appointments.createdAt,
      domainId: appointments.domainId,
      date: appointments.date,
      time: appointments.time,
      domain: domains,
    })
    .from(appointments)
    .leftJoin(domains, eq(domains.id, appointments.domainId))
    .where(
      and(
        eq(domains.userId, user.id),
        eq(appointments.domainId, domainId),
      )
    )
    .orderBy(desc(appointments.createdAt));

  return data;
}

export async function getTodaysAppointments() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: appointments.id,
      createdAt: appointments.createdAt,
      domainId: appointments.domainId,
      date: appointments.date,
      time: appointments.time,
      domain: domains,
    })
    .from(appointments)
    .leftJoin(domains, eq(domains.id, appointments.domainId))
    .where(
      and(
        eq(domains.userId, user.id),
        gte(appointments.date, startOfDay(new Date()).toISOString()),
        lte(appointments.date, endOfDay(new Date()).toISOString()),
      )
    )
    .orderBy(desc(appointments.createdAt));

  return data;
}