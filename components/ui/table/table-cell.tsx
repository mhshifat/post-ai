import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface TableCellProps {
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
}

export default function TableCell({ children, align = "left", className, colSpan }: PropsWithChildren<TableCellProps>) {
  return (
    <td colSpan={colSpan} className={cn("py-2 px-3", className, {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    })}>
      {children}
    </td>
  )
}