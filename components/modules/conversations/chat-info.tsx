import Avatar from "@/components/ui/avatar";

export default function ChatInfo() {
  return (
    <div className="py-2 px-3 h-14 flex items-center gap-5 justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Avatar />
        <span className="text-lg font-medium">Chat Info</span>
      </div>
    </div>
  )
}