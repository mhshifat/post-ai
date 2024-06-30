import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full">
      <Loader2 className="size-4 animate-spin text-slate-500" />
    </div>
  )
}