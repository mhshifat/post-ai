import { PropsWithChildren } from "react";

export default async function BlogsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col bg-background h-screen overflow-y-auto">
      {children}
    </div>
  )
}