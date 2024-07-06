import { PropsWithChildren } from "react";

export default function PortalLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  )
}