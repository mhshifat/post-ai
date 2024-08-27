"use server";

import slugify from 'slugify';
import { db } from "@/db/drizzle";
import { IBlog } from "@/utils/types";
import { and, desc, eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { v4 } from 'uuid';
import { getUserDetails } from "./users";
import { blogs } from "@/db/schema/blog";
import { users } from '@/db/schema/user';

export async function createBlog(payload: Partial<IBlog>) {
  const user = await getUserDetails();
  if (!user) return null;
  const result = await db.transaction(async (tx) => {
    const [data] = await tx
      .insert(blogs)
      .values({
        id: v4(),
        title: payload.title!,
        slug: slugify(payload.title?.toLowerCase()!),
        thumbnail: payload.thumbnail!,
        content: payload.content!,
        excerpt: payload.excerpt!,
        userId: user.id,
        createdAt: new Date()
      })
      .returning({
        id: blogs.id,
        createdAt: blogs.createdAt,
      })
      .execute();
      
    return data;
  })
  return result;
}

export async function updateBlog(blogId: string, payload: Partial<IBlog>) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .update(blogs)
    .set({
      title: payload.title,
      thumbnail: payload.thumbnail,
      content: payload.content,
      excerpt: payload.excerpt,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(blogs.id, blogId),
        eq(blogs.userId, user.id),
      )
    )
    .returning({
      id: blogs.id,
      createdAt: blogs.createdAt,
    })
    .execute();

  return data;
}

export async function getBlogDetails(blogId: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .select({
      id: blogs.id,
      userId: blogs.userId,
      title: blogs.title,
      excerpt: blogs.excerpt,
      slug: blogs.slug,
      content: blogs.content,
      thumbnail: blogs.thumbnail,
      updatedAt: blogs.updatedAt,
    })
    .from(blogs)
    .where(
      and(
        eq(blogs.id, blogId),
        eq(blogs.userId, user.id)
      )
    );
  return data;
}

export async function getBlogDetailsWithSlug(slug: string) {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return null;
  const [data] = await db
    .select({
      id: blogs.id,
      userId: blogs.userId,
      title: blogs.title,
      excerpt: blogs.excerpt,
      slug: blogs.slug,
      content: blogs.content,
      thumbnail: blogs.thumbnail,
      createdAt: blogs.createdAt,
      updatedAt: blogs.updatedAt,
      user: users,
    })
    .from(blogs)
    .leftJoin(users, eq(users.id, blogs.userId))
    .where(
      and(
        eq(blogs.slug, slug),
      )
    );
  
  return data;
}

export async function getBlogs() {
  unstable_noStore();

  const user = await getUserDetails();
  if (!user) return [];
  const data = await db
    .select({
      id: blogs.id,
      createdAt: blogs.createdAt,
      title: blogs.title,
      slug: blogs.slug,
      thumbnail: blogs.thumbnail,
      excerpt: blogs.excerpt,
      content: blogs.content,
      user: users,
    })
    .from(blogs)
    .leftJoin(users, eq(users.id, blogs.userId))
    .orderBy(desc(blogs.createdAt));

  return data;
}

export async function getAllBlogs() {
  unstable_noStore();

  const data = await db
    .select({
      id: blogs.id,
      createdAt: blogs.createdAt,
      title: blogs.title,
      slug: blogs.slug,
      thumbnail: blogs.thumbnail,
      excerpt: blogs.excerpt,
      content: blogs.content,
      user: users,
    })
    .from(blogs)
    .leftJoin(users, eq(users.id, blogs.userId))
    .orderBy(desc(blogs.createdAt));

  return data;
}

export async function deleteBlog(blogId: string) {
  const user = await getUserDetails();
  if (!user) return;
  const [data] = await db
    .delete(blogs)
    .where(
      and(
        eq(blogs.id, blogId),
        eq(blogs.userId, user.id)
      )
    )
    .returning({ id: blogs.id });

  return data;
}
