"use client";

import { getThreadDetails, updateThread } from "@/actions/threads";
import { useBot } from "@/components/providers/bot-provider";
import Spinner from "@/components/shared/spinner";
import Avatar from "@/components/ui/avatar";
import Switch from "@/components/ui/switch";
import { IThread } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ChatInfo() {
  const searchParams = useSearchParams();
  const threadId = searchParams.get("thread");
  const [threadDetails, setThreadDetails] = useState<Partial<IThread> | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLive } = useBot();

  useEffect(() => {
    if (!threadId) return setLoading(false);
    getThreadDetails(threadId)
      .then((data) => {
        setThreadDetails(data);
        setLoading(false);
      })
  }, [threadId])

  async function switchLiveMode(checked: boolean) {
    try {
      await updateThread({
        id: threadId!,
        isLive: checked
      });
      toast.success(checked ? "Switched to live mode" : "Switched off live mode");
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message);
      }
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="py-2 px-3 h-14 flex items-center gap-5 justify-between shadow-sm bg-background border-b border-border/50">
      <div className="flex items-center gap-2 w-full">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Avatar />
            <span className="text-lg font-medium text-foreground">{threadDetails?.title}</span>
            <span className="flex items-center gap-2 ml-auto">
              <Switch
                checked={isLive || false}
                onChange={(checked) => switchLiveMode(checked)}
              />
              <p className="text-sm text-foreground/50 m-0 leading-tight flex items-center gap-2">
              {isLive && (
                <>
                  <span className="w-2 h-2 rounded-full bg-primary flex" />
                  <span className="text-sm font-semibold text-primary">Live</span>
                </>
              )}
            </p>
            </span>
          </>
        )}
      </div>
    </div>
  )
}