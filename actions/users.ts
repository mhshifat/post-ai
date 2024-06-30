"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { v4 } from 'uuid';

export async function updateClerkUserDetailsAfterSignUp(args: {
  firstName: string,
  lastName: string,
  accountType: string,
  email: string,
}) {
  const user = await currentUser();
  if (!user) return;
  const [data] = await db
    .insert(users)
    .values({
      id: v4(),
      clerkId: user.id,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      accountType: args.accountType,
      createdAt: new Date()
    })
    .returning({ id: users.id })
    .execute();
  if (data.id) {
    await clerkClient.users.updateUser(user.id, {
      firstName: args.firstName,
      lastName: args.lastName,
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        accountType: args.accountType
      }
    });
  }
}