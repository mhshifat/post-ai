import { PropsWithChildren } from "react";
import { useSelect } from ".";
import { usePopup } from "../popup";

interface SelectOptionProps {
  className?: string;
  value?: string;
}

export default function SelectOption({ children, className, value }: PropsWithChildren<SelectOptionProps>) {
  const { togglePopup } = usePopup();
  const { changeSelected } = useSelect();
  
  function handleSelect() {
    changeSelected([{ value: value!, content: children }]);
    togglePopup();
  }
  return (
    <li className={className} onClick={handleSelect}>
      {children}
    </li>
  )
}