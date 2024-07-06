import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface TableCellProps {
  className?: string;
  align?: "left" | "center" | "right";
}

export default function TableCell({ children, align = "left", className }: PropsWithChildren<TableCellProps>) {
  return (
    <td className={cn("", className, {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    })}>
      {children}
    </td>
  )
}