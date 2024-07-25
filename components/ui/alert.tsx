import { cn } from "@/lib/utils";
import { HTMLAttributes, PropsWithChildren } from "react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "warning"
}

export default function Alert({ children, className, variant = "warning", ...restProps }: PropsWithChildren<AlertProps>) {
  return (
    <div {...restProps} className={cn("font-semibold text-sm rounded-md py-2 px-3", {
      "border border-warning bg-warning/10 text-warning": variant === 'warning'
    }, className)}>
      <p className="m-0">{children}</p>
    </div>
  )
}