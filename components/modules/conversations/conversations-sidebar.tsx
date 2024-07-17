"use client";

import Divider from "@/components/ui/divider";
import Select from "@/components/ui/select";
import Tab from "@/components/ui/tab";
import { cn } from "@/lib/utils";
import { Clock, Inbox, Mail, Star } from "lucide-react";
import Threads from "./threads";

export default function ConversationsSidebar() {
  return (
    <aside className="w-[370px] p-3 h-full border-r border-border/50 bg-background">
      <Tab className="flex flex-col h-full">
        <Tab.List
          className="flex items-center bg-foreground/10 rounded-lg p-1 [&>*]:flex-1"
          renderItem={({ content, isSelected }) => (
            <span className={cn("w-full flex justify-center items-center font-medium text-foreground text-sm gap-1 bg-transparent rounded-md cursor-pointer py-1 px-3", {
              "bg-background": isSelected
            })}>
              {content}
            </span>
          )}
        />

        <Select className="my-5">
          <Select.Trigger>
            <Select.Placeholder className="text-sm font-medium text-foreground/50">Domain Name</Select.Placeholder>
          </Select.Trigger>
          <Select.Content className="border-border border overflow-hidden rounded-lg bg-background shadow-sm">
            <Select.Search className="p-3 bg-background border-none outline-none shadow-none text-sm font-medium text-foreground/50" placeholder="Search" />
            <Divider />
            <Select.Option value="1" className="py-2 px-3 text-sm font-medium hover:bg-foreground/10 transition cursor-pointer">Domain 1</Select.Option>
            <Select.Option value="2" className="py-2 px-3 text-sm font-medium hover:bg-foreground/10 transition cursor-pointer">Domain 2</Select.Option>
          </Select.Content>
        </Select>

        <Tab.Item>
          <Tab.Trigger>
            <Mail className="size-4 text-current" />
            Unread
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            <Threads />
          </Tab.Content>
        </Tab.Item>
        <Tab.Item>
          <Tab.Trigger>
            <Inbox className="size-4 text-current" />
            All
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            <Threads />
          </Tab.Content>
        </Tab.Item>
        <Tab.Item>
          <Tab.Trigger>
            <Clock className="size-4 text-current" />
            Expired
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            <Threads />
          </Tab.Content>
        </Tab.Item>
        <Tab.Item>
          <Tab.Trigger>
            <Star className="size-4 text-current" />
            Stared
          </Tab.Trigger>
          <Tab.Content
            className="flex-1 overflow-y-auto"
          >
            <Threads />
          </Tab.Content>
        </Tab.Item>
      </Tab>
    </aside>
  )
}