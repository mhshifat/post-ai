import { getDomains } from "@/actions/domains";
import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const domains = await getDomains();
  
  return (
    <main className="w-full h-full flex">
      <DashboardSidebar
        domains={domains}
      />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </main>
  )
}