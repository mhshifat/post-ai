import { PropsWithChildren } from "react";
import Popup from "../popup";

export default function SelectTrigger({ children }: PropsWithChildren) {
  return (
    <Popup.Trigger>
      {children}
    </Popup.Trigger>
  )
}