import { PropsWithChildren } from "react";
import { useSelect } from ".";
import { usePopup } from "../popup";
import { cn } from "@/lib/utils";

interface SelectOptionProps {
  className?: string;
  value?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function SelectOption({ children, className, value, disabled, onClick }: PropsWithChildren<SelectOptionProps>) {
  const { togglePopup } = usePopup();
  const { changeSelected } = useSelect();
  
  function handleSelect() {
    if (disabled) return;
    changeSelected([{ value: value!, content: children }]);
    togglePopup();
  }
  return (
    <li className={cn("w-full px-3 py-2 text-foreground/50 transition cursor-pointer text-sm font-medium", className, {
      "hover:bg-background hover:text-foreground": onClick !== undefined || !disabled
    })} onClick={onClick ? () => {
      onClick?.();
      togglePopup();
    } : handleSelect}>
      {children}
    </li>
  )
}