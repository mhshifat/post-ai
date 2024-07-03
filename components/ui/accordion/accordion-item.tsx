import { Children, cloneElement, PropsWithChildren, ReactElement, useId } from "react";

export default function AccordionItem({ children }: PropsWithChildren) {
  const id = useId();

  return (
    <li>
      {Children.map(children, (child) => cloneElement(child as ReactElement, {
        identifier: id
      }))}
    </li>
  )
}