import { BotIcon } from "lucide-react";

export default function BotFloatingIcon({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="shrink-0 shadow-sm w-[60px] h-[60px] rounded-full flex items-center justify-center bg-amber-200 cursor-pointer">
      <BotIcon />
    </button>
  )
}