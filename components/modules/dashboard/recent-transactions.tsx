import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { BadgeDollarSign } from "lucide-react";

export default function RecentTransactions() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 justify-between">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <BadgeDollarSign className="size-5 mt-[2px]" />
          Recent transactions
        </h3>
        <Button size="sm" variant="link">See More</Button>
      </div>
      <Divider className="my-3" />

      <ul className="flex flex-col">
        <li className="flex items-center justify-between gap-5 px-3">
          <p className="uppercase text-base font-semibold">google.com</p>
          <span className="text-xl font-semibold text-slate-900">$90</span>
        </li>
        <li><Divider className="my-3" /></li>
        <li className="flex items-center justify-between gap-5 px-3">
          <p className="uppercase text-base font-semibold">google.com</p>
          <span className="text-xl font-semibold text-slate-900">$90</span>
        </li>
        <li><Divider className="my-3" /></li>
      </ul>
    </div>
  )
}