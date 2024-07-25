import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { BadgeDollarSign } from "lucide-react";

export default function RecentTransactions() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2 text-foreground">
          <BadgeDollarSign className="size-6" />
          Recent transactions
        </h3>
        <Button className="text-primary" size="sm" variant="link">See More</Button>
      </div>
      <Divider className="my-3" />

      <ul className="flex flex-col">
        <li className="flex items-center justify-between gap-5 px-3">
          <p className="uppercase text-base font-medium text-foreground/50">google.com</p>
          <span className="text-xl font-medium text-foreground/50">$90</span>
        </li>
        <li><Divider className="my-3" /></li>
        <li className="flex items-center justify-between gap-5 px-3">
          <p className="uppercase text-base font-medium text-foreground/50">google.com</p>
          <span className="text-xl font-medium text-foreground/50">$90</span>
        </li>
        <li><Divider className="my-3" /></li>
      </ul>
    </div>
  )
}