"use client";

import { PropsWithChildren } from "react";
import Portal from "../portal";
import { usePopup } from ".";
import ClientOnly from "../client-only";

export default function PopupContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { setPopupContentRef, getContentStyles } = usePopup();

  return (
    <ClientOnly>
      <Portal>
        <div ref={setPopupContentRef} style={{
          ...getContentStyles()
        }} className={className}>
          {children}
        </div>
      </Portal>
    </ClientOnly>
  )
}