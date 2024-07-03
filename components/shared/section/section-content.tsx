import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function SectionContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm", className)}>
      {children}
    </div>
  )
}