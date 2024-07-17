"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Spinner from "./spinner";
import { usePathname } from "next/navigation";
import { DASHBOARD_SIDEBAR_MAIN_LINKS } from "./dashboard-sidebar";

export default function DashboardInfoBar() {
  const pathname = usePathname();
  const currentPage = DASHBOARD_SIDEBAR_MAIN_LINKS.find(item => item.as === 'link' ? pathname?.includes(item.path) : false)

  return (
    <div className="border-b border-border/50 py-2 px-3 shadow-sm flex items-center gap-10 justify-between sticky top-0 left-0 z-50 bg-background-secondary">
      <div>
        <h3 className="text-base font-semibold text-foreground">{currentPage?.title}</h3>
        <p className="text-sm font-semibold text-foreground/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis?</p>
      </div>

      <div className="flex justify-center items-center">
        <ClerkLoaded>
          <UserButton signInUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
      </div>
    </div>
  )
}