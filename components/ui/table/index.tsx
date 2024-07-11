"use client";

import { createContext, PropsWithChildren, useContext } from "react"
import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableHeader from "./table-header";
import TableFooter from "./table-footer";
import TableContent from "./table-content";

interface TableProps {
  className?: string;
  renderPrefix?: (args: { type?: "header" | "body"; }) => JSX.Element;
  renderSuffix?: (args: { type?: "header" | "body"; }) => JSX.Element;
}

interface TableCtxProps extends TableProps {
}

const TableCtx = createContext<TableCtxProps | null>(null);

export default function Table({ children, className, renderPrefix, renderSuffix }: PropsWithChildren<TableProps>) {
  return (
    <TableCtx.Provider value={{
      renderPrefix,
      renderSuffix
    }}>
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