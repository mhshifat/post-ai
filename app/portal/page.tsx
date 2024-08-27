import { getUserDetails } from "@/actions/users";
import { db } from "@/db/drizzle";
import { domains } from "@/db/schema/domain";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function PortalPage() {
  const user = await getUserDetails();
  if (!user) return null;

  const [domain] = await db
    .select({ id: domains.id })
    .from(domains)
    .where(
      eq(domains.userId, user.id)
    );
  
  if (!domain) return null;
  return redirect(`/portal/${domain.id}`);
}