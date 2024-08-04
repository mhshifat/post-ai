import { PropsWithChildren } from "react";
import { useTable } from ".";
import TableCell from "./table-cell";

interface TableRowProps {
  type?: "header" | "body" | "extra";
  className?: string;
  data?: { id: string };
}

const IDENTIFIER = 'id';
export default function TableRow({ children, className, type = "body", data }: PropsWithChildren<TableRowProps>) {
  const { selectableDisabled, renderSuffix, selectable, isSelected, toggleSelected, selectableCheckedContent, selectableUncheckedContent } = useTable();
  const identifier = data?.[IDENTIFIER] || "*";
  
  return (
    <tr className={className}>
      {selectable && type !== "extra" && (
        <TableCell className="text-left w-0">
          <label>
            <input disabled={selectableDisabled} hidden type="checkbox" checked={isSelected(identifier)} onChange={({ target }) => toggleSelected(identifier, target.checked)} />
            {isSelected(identifier) ? selectableCheckedContent : selectableUncheckedContent}
          </label>
        </TableCell>
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