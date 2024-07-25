import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { PropsWithChildren } from "react";
import { useSelect } from ".";

export default function SelectPlaceholder({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { selected } = useSelect();

  return (
    <div className={cn("border-border border py-1 px-3 flex items-center justify-between gap-2 h-[40px] rounded-lg cursor-pointer text-sm", className)}>
      {!selected?.length && <span className="text-foreground/50">{children}</span>}
      {!!selected?.length && selected[0].content}

      <ChevronDown className="size-4 text-foreground/50" />
    </div>
  )
}