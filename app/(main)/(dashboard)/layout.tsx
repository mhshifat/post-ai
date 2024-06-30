import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await currentUser();
  
  if (!user) return redirect("/sign-in");
  return (
    <main className="w-full h-full flex">
      <DashboardSidebar />
      {children}
    </main>
  )
}