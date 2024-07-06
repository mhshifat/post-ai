import { PropsWithChildren } from "react";

export default function TableRow({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <tr className={className}>
      {children}
    </tr>
  )
}