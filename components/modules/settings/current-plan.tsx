"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import SelectPlan from "./select-plan";
import Image from "next/image";
import { plans } from "@/utils/constants";
import Badge from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";

export default function CurrentPlan() {
  const { openDialog } = useDialog();
  const currentPlan = plans[0];

  return (
    <div className="w-full">
      <div className="flex gap-10">
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <Image fill className="object-cover" src="https://images.ui8.net/uploads/presentation_1612381616989.png" alt="" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl uppercase font-semibold flex gap-2">
            {currentPlan.title}
            <Badge>{currentPlan.price === 0 ? "FREE" : `$${currentPlan.price}`}</Badge>
          </h3>
          <ul className="flex flex-col gap-1 mt-5">
            {currentPlan?.benefits.map((item, idx) => (
              <li key={item + idx} className="flex items-start gap-2 text-sm text-slate-500"><CheckIcon className="mt-1 shrink-0 size-4 text-slate-500" /> {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button className="w-full mt-5" onClick={() => openDialog({
        title: "Select Plan",
        description: "Please select a plan",
        content: <SelectPlan />
      })}>Upgrade plan</Button>
    </div>
  )
}