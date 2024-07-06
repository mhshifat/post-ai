"use client";

import { CirclePlus, Headset, Inbox, LayoutDashboardIcon, LogOut, MessageCircle, MonitorSmartphone, Settings, Workflow } from "lucide-react";
import LogoIcon from "./logo-icon";
import { FunctionComponent, PropsWithChildren } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { useDialog } from "../providers/dialog-provider";
import CreateDomainForm from "../modules/domain/create-domain-form";
import { IDomainsWithUserId } from "@/utils/types";
import Image from "next/image";

type SidebarButtonType = {
  as: "button",
  onClick?: () => void,
}

type SidebarLinkType = {
  as: "link",
  path: string,
  onClick?: () => void,
}

type SidebarLink = {
  icon: FunctionComponent<{ className?: string }>;
  title: string;
} & (SidebarLinkType | SidebarButtonType);

const DASHBOARD_SIDEBAR_MAIN_LINKS: SidebarLink[] = [
  {
    as: "link",
    icon: LayoutDashboardIcon,
    title: "Dashboard",
    path: "/dashboard"
  },
  {
    as: "link",
    icon: MessageCircle,
    title: "Conversations",
    path: "/conversations"
  },
  {
    as: "link",
    icon: Workflow,
    title: "Integrations",
    path: "/"
  },
  {
    as: "link",
    icon: Settings,
    title: "Settings",
    path: "/"
  },
  {
    as: "link",
    icon: Headset,
    title: "Appointments",
    path: "/appointments"
  },
  {
    as: "link",
    icon: Inbox,
    title: "Email Marketing",
    path: "/"
  },
];

const DASHBOARD_SIDEBAR_FOOTER_LINKS: SidebarLink[] = [
  {
    as: "button",
    icon: LogOut,
    title: "Sign out",
    onClick: () => {}
  },
  {
    as: "button",
    icon: MonitorSmartphone,
    title: "Mobile App",
    onClick: () => {}
  }
];

const isSidebarItemLinkType = (data: SidebarLinkType | SidebarButtonType): data is SidebarLinkType => data?.as === 'link';

function SidebarItem({ children, item }: PropsWithChildren<{ item: SidebarLinkType | SidebarButtonType }>) {
  if (isSidebarItemLinkType(item)) {
    return (
      <Link href={item.path}>{children}</Link>
    )
  } else {
    return (
      <Button variant="ghost" className="p-0 h-full" onClick={item?.onClick}>{children}</Button>
    )
  }
}

export default function DashboardSidebar({ domains }: { domains: IDomainsWithUserId }) {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { openDialog, closeDialog } = useDialog();

  function handleSignOut() {
    signOut({
      redirectUrl: "/sign-in"
    });
  }
  function handleClick(type: string) {
    switch (type) {
      case "Sign out":
        return handleSignOut();
      default:
        return;
    }
  }
  return (
    <aside className="py-3 px-3 pb-8 bg-slate-100 flex flex-col">
      <LogoIcon />

      <ul className="my-10 flex flex-col justify-center items-center gap-7">
        {DASHBOARD_SIDEBAR_MAIN_LINKS.map(({ icon: Icon, ...item }) => (
          <li key={item.title} className="cursor-pointer group">
            <SidebarItem
              item={item}
            >
              <Icon className={cn("group-hover:text-slate-600 transition", item.as === 'link' && pathname === item.path ? "text-slate-600" : "text-slate-500")} />
            </SidebarItem>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col justify-center items-center gap-4">
        <li className="cursor-pointer group">
          <CirclePlus onClick={() => openDialog({
            title: "Create a domain",
            description: "Please fill the necessary information to complete the domain creation",
            content: <CreateDomainForm onSubmit={() => {
              closeDialog();
              router.refresh();
            }} />
          })} className="text-slate-500 group-hover:text-slate-600 transition" />
        </li>
        {domains?.map(domain => (
          <li key={domain.id}>
            <Link
              href={`/settings/${domain.id}`}
            >
              <Image
                src={domain.details?.logo || ""}
                alt={domain.details?.domain || ""}
                width={30}
                height={30}
                className="bg-slate-300 rounded-full cursor-pointer border border-slate-300 object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col mt-auto justify-center items-center gap-7">
        {DASHBOARD_SIDEBAR_FOOTER_LINKS.map(({ icon: Icon, ...item }) => (
          <li key={item.title} className="cursor-pointer group">
            <SidebarItem
              item={{
                ...item,
                onClick: () => handleClick(item.title)
              }}
            >
              <Icon className={cn("group-hover:text-slate-600 transition", item.as === 'link' && pathname === item.path ? "text-slate-600" : "text-slate-500")} />
            </SidebarItem>
          </li>
        ))}
      </ul>
    </aside>
  )
}