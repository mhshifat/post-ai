"use client";

import { useTheme } from "@/components/providers/theme-provider";
import ClientOnly from "@/components/ui/client-only";
import Image from "next/image";

export default function BgImage() {
  const { mode } = useTheme();

  return (
    <ClientOnly>
      <Image
        fill
        src={mode === "DARK" ? "/images/dark-bg.png" : "/images/light-bg.png"}
        alt=""
        className="object-cover object-left-top overflow-x-visible w-full h-full"
      />
    </ClientOnly>
  )
}