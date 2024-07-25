"use client";

import { PropsWithChildren } from "react";
import DialogItem from "./dialog-item";
import DialogOverlay from "./dialog-overlay";
import Portal from "../portal";
import ClientOnly from "../client-only";
import DialogHeader from "./dialog-header";
import DialogBody from "./dialog-body";

export default function Dialog({ children }: PropsWithChildren) {
  return (
    <ClientOnly>
      <Portal>
        {children}
      </Portal>
    </ClientOnly>
  )
}

Dialog.Item = DialogItem;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Overlay = DialogOverlay;