import { PropsWithChildren } from "react";

export default function TableContent({ children }: PropsWithChildren) {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {children}
      </tbody>
    </table>
  )
}