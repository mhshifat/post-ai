import { cn } from "@/lib/utils";

export default function Switch() {
  return (
    <label className="w-10 h-6 bg-slate-300 flex cursor-pointer rounded-full relative">
      <input hidden type="checkbox" />
      <span className={cn("flex items-center justify-center w-5 h-5 rounded-full absolute top-1/2 -translate-y-1/2 transition", {
        "right-[3px] shadow-md bg-[#007DFC]": true,
        "left-[3px] bg-slate-500": true,
      })} />
    </label>
  )
}