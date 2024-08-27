"use client";

import { usePathname } from "next/navigation";
import { DASHBOARD_SIDEBAR_MAIN_LINKS } from "./dashboard-sidebar";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import Avatar from "../ui/avatar";
import { useDialog } from "../providers/dialog-provider";
import NotificationList from "../modules/notifications/notification-list";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Spinner from "./spinner";

export default function DashboardInfoBar() {
  const { openDialog } = useDialog();

  const pathname = usePathname();
  const currentPage = DASHBOARD_SIDEBAR_MAIN_LINKS.find(item => item.as === 'link' ? pathname?.includes(item.path) : false)

  return (
    <div className="border-b border-border/50 py-2 px-3 shadow-sm flex items-center gap-10 justify-between sticky top-0 left-0 z-50 bg-background-secondary">
      <div>
        <h3 className="text-lg font-medium text-foreground">{currentPage?.title}</h3>
        <p className="text-xs font-medium text-foreground/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis?</p>
      </div>

      <div className="flex justify-center items-center gap-2">
        <Button onClick={() => openDialog({
          title: "All Notifications",
          description: "Notification history",
          position: "right",
          content: <NotificationList />
        })} className="shrink-0" variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>
        {/* <Avatar
          className="shrink-0"
          size={35}
        /> */}
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