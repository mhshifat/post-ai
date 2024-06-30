"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { v4 } from 'uuid';

export async function updateClerkUserDetailsAfterSignUp(args: {
  firstName: string,
  lastName: string,
  accountType: string,
  email: string,
  clerkId: string,
}) {
  if (!args.clerkId) return;
  const [data] = await db
    .insert(users)
    .values({
      id: v4(),
      clerkId: args.clerkId,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      accountType: args.accountType,
      createdAt: new Date()
    })
    .returning({ id: users.id })
    .execute();
  if (data.id) {
    await clerkClient.users.updateUser(args.clerkId, {
      firstName: args.firstName,
      lastName: args.lastName,
    });
    await clerkClient.users.updateUserMetadata(args.clerkId, {
      privateMetadata: {
        accountType: args.accountType,
        userId: data.id,
      }
    });
  }
}