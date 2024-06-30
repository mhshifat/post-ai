"use client";

import { PropsWithChildren } from "react";
import DialogProvider from "./dialog-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <DialogProvider>
      {children}
    </DialogProvider>
  )
}