import Avatar from "@/components/ui/avatar";
import Switch from "@/components/ui/switch";

export default function ChatInfo() {
  return (
    <div className="py-2 px-3 h-14 flex items-center gap-5 justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Avatar />
        <span className="text-lg font-medium">Chat Info</span>
        <span className="ml-2">
          <Switch />
        </span>
      </div>
    </div>
  )
}