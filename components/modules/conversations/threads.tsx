import { getThreads } from "@/actions/domains";
import NotFound from "@/components/shared/not-found";
import Spinner from "@/components/shared/spinner";
import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { IThread } from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Threads({}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domainId = searchParams.get("domain");
  const threadId = searchParams.get("thread");
  const [threads, setThreads] = useState<IThread[]>([]);
  const [loading, setLoading] = useState(true);

  const isSelected = useCallback((thread: typeof threads[0]) => thread.id === threadId, [threadId]);

  useEffect(() => {
    if (!domainId) return setLoading(false);
    getThreads(domainId)
      .then((data) => {
        setThreads(data as IThread[]);
        setLoading(false);
      })
  }, [domainId])

  if (loading) return (
    <div className="flex flex-col gap-1 py-8">
      <Spinner />
    </div>
  )
  return (
    <ul className="flex flex-col gap-1">
      {threads.map(thread => (
        <li onClick={() => router.push(`${pathname}?${searchParams.toString()}&thread=${thread.id}`)} key={thread.title} className={cn("flex gap-2 items-center py-2 cursor-pointer rounded-md px-3 hover:bg-foreground/10", {
          "bg-foreground/10": isSelected(thread)
        })}>
          <Avatar
            size={35}
            className="shrink-0"
          />
          <span className={cn("font-medium text-sm text-foreground/50", {
            "text-foreground": isSelected(thread)
          })}>{thread.title}</span>
        </li>
      ))}
      {!threads.length && (
        <li><NotFound /></li>
      )}
    </ul>
  )
}