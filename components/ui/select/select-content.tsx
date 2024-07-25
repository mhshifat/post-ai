import { PropsWithChildren } from "react";
import Popup from "../popup";
import { cn } from "@/lib/utils";

export default function SelectContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <Popup.Content>
      <ul className={cn("bg-background-secondary py-2 rounded-md border border-border w-full flex flex-col", className)}>
        {children}
      </ul>
    </Popup.Content>
  )
}