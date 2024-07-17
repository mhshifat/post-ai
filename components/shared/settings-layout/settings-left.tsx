import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function SettingsLeft({ children, className, title, description }: PropsWithChildren<{ className?: string; title: string; description: string }>) {
  return (
    <div className={cn("w-[300px] shrink-0", className)}>
      <div>
        <h3 className="text-lg capitalize font-medium text-balance text-foreground">{title}</h3>
        <p className="text-sm font-normal text-balance text-foreground/50">{description}</p>
      </div>
      {children}
    </div>
  )
}