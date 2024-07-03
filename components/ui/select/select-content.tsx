import { PropsWithChildren } from "react";
import Popup from "../popup";

export default function SelectContent({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <Popup.Content className={className}>
      <ul className="w-full">
        {children}
      </ul>
    </Popup.Content>
  )
}