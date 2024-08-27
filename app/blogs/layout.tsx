import Header from "@/components/layouts/header";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export default async function BlogsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 flex flex-col bg-background h-screen overflow-y-auto">
      <ClerkProvider>
        <Header
          page="blogs"
        />
        {children}
      </ClerkProvider>
    </div>
  )
}