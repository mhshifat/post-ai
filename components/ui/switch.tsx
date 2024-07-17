"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Switch() {
  const [checked, setChecked] = useState(false);

  return (
    <label className={cn("w-10 h-6 flex cursor-pointer rounded-full relative transition bg-foreground/10")}>
      <input hidden type="checkbox" checked={checked} onChange={({ target }) => setChecked(target.checked)} />
      <span className={cn("flex items-center justify-center w-5 h-5 rounded-full absolute top-1/2 -translate-y-1/2 transition", {
        "right-[3px] shadow-md bg-foreground": checked,
        "left-[3px] bg-foreground/50": !checked,
      })} />
    </label>
  )
}