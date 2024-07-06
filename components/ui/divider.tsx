import { cn } from "@/lib/utils";

export default function Divider({ className }: { className?: string }) {
  return (
    <hr className={cn("bg-slate-50", className)} />
  )
}