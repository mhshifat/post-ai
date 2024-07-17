"use client";

import { useTheme } from "@/components/providers/theme-provider";
import Image from "next/image";

export default function AuthBannerImage() {
  const { mode } = useTheme();

  return (
    <Image
      fill
      src={mode === "DARK" ? "/images/dark-bg.png" : "/images/light-bg.png"}
      alt=""
      className="object-cover object-left-top overflow-x-visible !w-[150%] max-w-screen-2xl"
    />
  )
}