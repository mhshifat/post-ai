"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useId, useState } from "react"
import AccordionItem from "./accordion-item";
import AccordionTrigger from "./accordion-trigger";
import AccordionContent from "./accordion-content";

interface AccordionProps {
  className?: string;
}

interface AccordionCtxProps extends AccordionProps {
  selectedItem: string | null;
  selectItem: (id: string) => void;
}

const AccordionCtx = createContext<AccordionCtxProps | null>(null);

export default function Accordion({ children, className }: PropsWithChildren<AccordionProps>) {
  const id = useId();
  const identifier = id;
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectItem = useCallback((id: string) => {
    setSelectedItem((value) => value === id ? null : id);
  }, [])
  return (
    <AccordionCtx.Provider value={{
      selectItem,
      selectedItem
    }}>
      <ul className={className}>
        {children}
      </ul>
    </AccordionCtx.Provider>
  )
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export function useAccordion() {
  const res = useContext(AccordionCtx);
  if (!res) throw new Error("Component needs to wrapped with Accordion");
  return res;
}