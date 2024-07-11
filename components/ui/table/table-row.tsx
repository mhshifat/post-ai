import { PropsWithChildren } from "react";
import TableCell from "./table-cell";
import { useTable } from ".";

interface TableRowProps {
  type?: "header" | "body";
  className?: string;
}

export default function TableRow({ children, className, type = "body" }: PropsWithChildren<TableRowProps>) {
  const { renderPrefix, renderSuffix } = useTable();
  
  return (
    <tr className={className}>
      {renderPrefix && (
        <>
          {renderPrefix?.({ type })}
        </>
      )}
      {children}
      {renderSuffix && (
        <>
          {renderSuffix?.({ type })}
        </>
      )}
    </tr>
  )
}