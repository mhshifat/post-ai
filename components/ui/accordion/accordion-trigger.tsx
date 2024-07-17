import { ChevronDown } from "lucide-react";
import { PropsWithChildren } from "react";
import { useAccordion } from ".";
import { cn } from "@/lib/utils";

export default function AccordionTrigger({ children, identifier, className }: PropsWithChildren<{ identifier?: string; className?: string }>) {
  const { selectItem } = useAccordion();

  return (
    <div onClick={() => selectItem(identifier!)} className={cn("flex items-center gap-5 justify-between cursor-pointer", className)}>
      {children}
      <ChevronDown className="text-foreground/50" />
    </div>
  )
}