import { PropsWithChildren } from "react";
import { useAccordion } from ".";

export default function AccordionContent({ children, identifier, className }: PropsWithChildren<{ identifier?: string; className?: string }>) {
  const { selectedItem } = useAccordion();

  if (identifier !== selectedItem) return null;
  return (
    <div className={className}>
      {children}
    </div>
  )
}