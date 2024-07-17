import { cn } from "@/lib/utils";

interface SelectSearchProps {
  className?: string;
  placeholder?: string;
}

export default function SelectSearch({ className, placeholder }: SelectSearchProps) {
  return (
    <li>
      <input className={cn("w-full", className)} type="text" placeholder={placeholder} />
    </li>
  )
}