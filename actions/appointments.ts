import { IAppointment } from "@/utils/types";
import { getUserDetails } from "./users";
import { db } from "@/db/drizzle";
import { appointments, domains } from "@/db/schema";
import { v4 } from "uuid";
import { unstable_noStore } from "next/cache";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { endOfDay, startOfDay } from 'date-fns';

export async function createAppointment(payload: Partial<IAppointment>) {
  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .insert(appointments)
    .values({
      id: v4(),
      domainId: payload.domainId!,
      date: payload.date!,
      time: payload.time!,
      createdAt: new Date(),
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