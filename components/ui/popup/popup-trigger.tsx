import { PropsWithChildren } from "react";
import { usePopup } from ".";

export default function PopupTrigger({ children }: PropsWithChildren) {
  const { setPopupTriggerRef, togglePopup } = usePopup();

  return (
    <div ref={setPopupTriggerRef} onClick={togglePopup}>
      {children}
    </div>
  )
}