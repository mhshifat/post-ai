import Tab from "@/components/ui/tab";
import { cn } from "@/lib/utils";
import { HandHelping, Mail } from "lucide-react";
import ChatContents from "./chat-contents";
import ChatHelpDesk from "./chat-help-desk";

export default function ChatTabs({}: {}) {
  return (
    <Tab className="flex flex-col h-full">
      <div className="py-2 px-3 border-b border-slate-100">
        <Tab.List
          className="flex items-center bg-slate-200 rounded-lg p-1 [&>*]:flex-1"
          renderItem={({ content, isSelected }) => (
            <span className={cn("w-full flex justify-center items-center font-medium text-slate-600 text-sm gap-1 bg-transparent rounded-md cursor-pointer py-1 px-3", {
              "bg-white": isSelected
            })}>
              {content}
            </span>
          )}
        />
      </div>

      <Tab.Item>
        <Tab.Trigger>
          <Mail className="size-4 text-current" />
          Chat
        </Tab.Trigger>
        <Tab.Content
          className="flex-1 overflow-y-auto"
        >
          <ChatContents />
        </Tab.Content>
      </Tab.Item>
      <Tab.Item>
        <Tab.Trigger>
          <HandHelping className="size-4 text-current" />
          Help Desk
        </Tab.Trigger>
        <Tab.Content
          className="flex-1 overflow-y-auto"
        >
          <ChatHelpDesk />
        </Tab.Content>
      </Tab.Item>
    </Tab>
  );
}