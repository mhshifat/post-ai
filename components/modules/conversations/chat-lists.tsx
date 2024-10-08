import { useBot } from "@/components/providers/bot-provider";
import { cn } from "@/lib/utils";
import { BotIcon, User2Icon } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatListsProps {
  className?: string;
}

export default function ChatLists({ className }: ChatListsProps) {
  const { domainId, messages, chatConfig } = useBot();

	return (
		<ul className={cn("list-none p-8 flex flex-col-reverse gap-8 flex-[1_0_0] overflow-y-auto overflow-x-hidden bg-background", className)}>
			{messages.map((item) =>
				((item.senderId === "bot" || item.senderId === domainId)) ? (
					<li key={item.id} className="flex items-start gap-5 max-w-[80%] w-max">
						<span className="shrink-0 w-10 h-10 border-border flex items-center justify-center border rounded-full bg-foreground/10">
							<BotIcon className="text-foreground/50" />
						</span>
						<div className={cn("break-keep break-words transition w-full py-3 px-5 border border-border bg-foreground/10 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl prose text-foreground", {
              "!w-max": item.content === "..."
            })}>
              {(item?.content === "..." && item.senderId !== chatConfig.senderId) && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
							{item?.content !== "..." && (
                <Markdown remarkPlugins={[remarkGfm]}>
                  {item.content}
                </Markdown>
              )}
						</div>
					</li>
				) : (
					<li
						key={item.id}
						className="flex items-start gap-5 max-w-[80%] ml-auto w-max"
					>
						<span className="shrink-0 w-10 h-10 border-border flex items-center justify-center border rounded-full bg-foreground/10 order-2">
							<User2Icon className="text-foreground/50" />
						</span>
						<div className={cn("break-keep break-words transition w-full py-3 px-5 border border-border bg-foreground/10 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl prose text-foreground order-1", {
              "!w-max": item.content === "..."
            })}>
              {(item?.content === "..." && item.senderId !== chatConfig.senderId) && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {item?.content !== "..." && (
                <Markdown remarkPlugins={[remarkGfm]}>
                  {item.content}
                </Markdown>
              )}
						</div>
					</li>
				)
			)}
		</ul>
	);
}
