import { getDomains } from "@/actions/domains";
import { getUserDetails } from "@/actions/users";
import DashboardInfoBar from "@/components/shared/dashboard-info-bar";
import DashboardSidebar from "@/components/shared/dashboard-sidebar";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await getUserDetails();
  
  if (!user) return redirect("/sign-in");
  const domains = await getDomains();
  
  return (
    <main className="w-full h-full flex">
      <DashboardSidebar
        domains={domains}
      />
      <div className="flex-1 overflow-y-auto flex flex-col">
        <DashboardInfoBar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </main>
  )
}