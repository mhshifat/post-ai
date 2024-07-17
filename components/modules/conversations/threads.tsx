import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export default function Threads({}) {
  const [threads, setThreads] = useState([
    {
      id: "1",
      title: "Thread 1",
    },
    {
      id: "2",
      title: "Thread 2",
    },
    {
      id: "3",
      title: "Thread 3",
    },
    {
      id: "4",
      title: "Thread 4",
    },
    {
      id: "5",
      title: "Thread 5",
    },
  ]);

  const isSelected = useCallback((thread: typeof threads[0]) => thread.id === "1", []);

  return (
    <ul className="flex flex-col gap-1">
      {threads.map(thread => (
        <li key={thread.title} className={cn("flex gap-2 items-center py-2 cursor-pointer rounded-md px-3 hover:bg-foreground/10", {
          "bg-foreground/10": isSelected(thread)
        })}>
          <Avatar />
          <span className={cn("font-medium text-sm text-foreground/50", {
            "text-foreground": isSelected(thread)
          })}>{thread.title}</span>
        </li>
      ))}
    </ul>
  )
}