import { cn } from "@/lib/utils";

interface SelectSearchProps {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function SelectSearch({ className, placeholder, onChange }: SelectSearchProps) {
  return (
    <li>
      <input className={cn("w-full", className)} type="text" onChange={({ target }) => onChange?.(target.value)} placeholder={placeholder} />
    </li>
  )
}