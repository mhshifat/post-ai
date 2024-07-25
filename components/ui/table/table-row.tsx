import { PropsWithChildren } from "react";
import { useTable } from ".";

interface TableRowProps {
  type?: "header" | "body" | "extra";
  className?: string;
  data?: unknown;
}

export default function TableRow({ children, className, type = "body", data }: PropsWithChildren<TableRowProps>) {
  const { renderPrefix, renderSuffix } = useTable();
  
  return (
    <tr className={className}>
      {renderPrefix && (
        <>
          {renderPrefix?.({ type, data })}
        </>
      )}
      {children}
      {renderSuffix && (
        <>
          {renderSuffix?.({ type, data })}
        </>
      )}
    </tr>
  )
}