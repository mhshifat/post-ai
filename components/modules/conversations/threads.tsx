import Avatar from "@/components/ui/avatar";

export default function Threads({}) {
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex gap-2 items-center py-2 cursor-pointer bg-slate-100 rounded-md px-3">
        <Avatar />
        <span className="font-medium text-sm">Thread 1</span>
      </li>
      <li className="flex gap-2 items-center py-2 cursor-pointer rounded-md px-3 transition hover:bg-slate-100">
        <Avatar />
        <span className="font-medium text-sm text-slate-500">Thread 1</span>
      </li>
    </ul>
  )
}