"use client";

import { useTheme } from "@/components/providers/theme-provider";
import Image from "next/image";

export default function BgImage() {
  const { currentTheme } = useTheme();

  return (
    <Image
      fill
      src={currentTheme === "DARK" ? "/images/dark-bg.png" : "/images/light-bg.png"}
      alt=""
      className="object-cover object-left-top overflow-x-visible w-full h-full"
    />
  )
}