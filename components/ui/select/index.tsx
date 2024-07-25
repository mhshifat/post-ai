"use client";

import { createContext, Dispatch, PropsWithChildren, ReactElement, ReactNode, SetStateAction, useCallback, useContext, useEffect, useId, useState } from "react"
import SelectTrigger from "./select-trigger";
import SelectOption from "./select-option";
import SelectContent from "./select-content";
import SelectSearch from "./select-search";
import SelectPlaceholder from "./select-placeholder";
import Popup from "../popup";

interface SelectProps {
  className?: string;
  value?: {
    value: string;
    content: ReactNode;
  }[]
  onChange?: (value: string) => void;
}

interface SelectCtxProps extends SelectProps {
  selected: {
    value: string;
    content: ReactNode;
  }[];
  changeSelected: (value: {
    value: string;
    content: ReactNode;
  }[]) => void;
}

const SelectCtx = createContext<SelectCtxProps | null>(null);

export default function Select({ children, className, onChange, value }: PropsWithChildren<SelectProps>) {
  const [selected, setSelected] = useState<{value: string; content: ReactNode}[]>([]);

  const changeSelected = useCallback((value: {
    value: string;
    content: ReactNode;
  }[]) => {
    setSelected(value);
    onChange?.(value[0].value);
  }, []);

  useEffect(() => {
    setSelected(value || []);
  }, [value])

  return (
    <SelectCtx.Provider value={{
      selected,
      changeSelected
    }}>
      <Popup className={className || ""}>
        {children}
      </Popup>
    </SelectCtx.Provider>
  )
}

Select.Trigger = SelectTrigger;
Select.Option = SelectOption;
Select.Content = SelectContent;
Select.Search = SelectSearch;
Select.Placeholder = SelectPlaceholder;

export function useSelect() {
  const res = useContext(SelectCtx);
  if (!res) throw new Error("Component needs to wrapped with Select");
  return res;
}