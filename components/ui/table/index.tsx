"use client";

import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState } from "react"
import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableHeader from "./table-header";
import TableFooter from "./table-footer";
import TableContent from "./table-content";

type Selectable = 
  | { selectable: true; onSelected: (args: string[]) => void; selectableCheckedContent?: ReactElement; selectableUncheckedContent?: ReactElement; selectableDisabled?: boolean; } 
  | { selectable?: false; onSelected?: never; selectableCheckedContent?: never; selectableUncheckedContent?: never; selectableDisabled?: never; };

type TableProps = ({
  className?: string;
  renderPrefix?: (args: { type?: "header" | "body" | "extra"; data?: unknown; }) => JSX.Element;
  renderSuffix?: (args: { type?: "header" | "body" | "extra"; data?: unknown; }) => JSX.Element;
} & Selectable);

type TableCtxProps = TableProps & {
  isSelected: (identifier: string) => boolean;
  toggleSelected: (identifier: string, checked: boolean) => void;
}

const TableCtx = createContext<TableCtxProps | null>(null);

export default function Table({
  children, className, renderPrefix, renderSuffix, selectable, onSelected,
  selectableCheckedContent,
  selectableUncheckedContent,
  selectableDisabled
}: PropsWithChildren<TableProps>) {
  const [selectedRowIdentifiers, setSelectedRowIdentifiers] = useState<string[]>([]);

  const toggleSelected = useCallback((identifier: string, checked: boolean) => {
    setSelectedRowIdentifiers(values => {
      const newValues = identifier === "*" && !checked 
        ? [] 
        : checked && !values.some(v => v === identifier) 
        ? [...values, identifier] 
        : !checked 
        ? values.filter(v => v !== identifier)
        : values;
      selectable && setTimeout(() => onSelected(newValues.includes("*") ? ["*"] : newValues), 0);
      return newValues;
    });
  }, [selectable])
  const isSelected = useCallback((identifier: string) => {
    return selectedRowIdentifiers.some(v => selectedRowIdentifiers.includes("*") || v === identifier);
  }, [selectedRowIdentifiers])

  return (
    <TableCtx.Provider value={{
      renderPrefix,
      renderSuffix,
      selectable,
      isSelected,
      toggleSelected,
      onSelected,
      selectableCheckedContent,
      selectableUncheckedContent,
      selectableDisabled
    } as TableCtxProps}>
      <div className={className}>
        {children}
      </div>
    </TableCtx.Provider>
  )
}

Table.Header = TableHeader;
Table.Footer = TableFooter;
Table.Content = TableContent;
Table.Row = TableRow;
Table.Cell = TableCell;

export function useTable() {
  const res = useContext(TableCtx);
  if (!res) throw new Error("Component needs to wrapped with Table");
  return res;
}