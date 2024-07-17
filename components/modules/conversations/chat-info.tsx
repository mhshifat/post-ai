import Avatar from "@/components/ui/avatar";
import Switch from "@/components/ui/switch";

export default function ChatInfo() {
  return (
    <div className="py-2 px-3 h-14 flex items-center gap-5 justify-between shadow-sm bg-background border-b border-border/50">
      <div className="flex items-center gap-2">
        <Avatar />
        <span className="text-lg font-medium text-foreground">Chat Info</span>
        <span className="ml-2">
          <Switch />
        </span>
      </div>
    </div>
  )
}