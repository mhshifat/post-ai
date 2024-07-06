import Avatar from "@/components/ui/avatar";

export default function MessengerHeader() {
  return (
    <div className="py-2 px-3 border-b border-slate-100 flex items-center gap-2">
      <Avatar size={50} />

      <div className="flex flex-col gap-0">
        <h3 className="text-lg font-medium m-0 leading-tight">Google</h3>
        <p className="text-sm text-slate-500 m-0 leading-tight">google.com</p>
      </div>

      <div className="flex items-center ml-auto">
        <Avatar className="cursor-pointer relative -left-[0px]" />
        <Avatar className="cursor-pointer relative -left-[5px]" />
        <Avatar className="cursor-pointer relative -left-[10px]" />
      </div>
    </div>
  )
}