import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function SettingsRight({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex-1", className)}>
      {children}
    </div>
  )
}