import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, Ref } from "react";

interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function DialogOverlay({ className, ...props }: DialogOverlayProps, ref: Ref<HTMLDivElement>) {
  return (
    <div ref={ref} className={cn("fixed inset-0 w-full h-full bg-foreground/20 z-[-1px] isolate duration-200 ease-in-out transition-opacity opacity-0 pointer-events-none", className)} {...props} />
  )
}

export default forwardRef(DialogOverlay);