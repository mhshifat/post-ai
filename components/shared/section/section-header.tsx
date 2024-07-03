import { PropsWithChildren } from "react";

export default function SectionHeader({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}