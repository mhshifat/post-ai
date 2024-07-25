import AuthBannerImage from "@/components/modules/auth/auth-banner-image";
import Logo from "@/components/shared/logo";
import ClientOnly from "@/components/ui/client-only";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const user = await currentUser();
  if (user) return redirect("/dashboard");

  return (
    <main className="flex-1 w-full h-full flex">
      <div className="basis-[600px] py-8 px-10 flex flex-col">
        <div className="flex justify-start items-center mb-5">
          <Logo className="h-7 w-max" />
        </div>
        
        <div className="flex-1 py-14">
          {children}
        </div>
      </div>

      <div className="flex-[1_0_0] py-8 px-10 bg-background-secondary flex flex-col overflow-hidden">
        <h2 className="font-bold text-3xl mb-2 uppercase tracking-wide leading-10 text-foreground/80">Hi, I am your AI powered<br/> sales assistant</h2>
        <p className="font-sans text-base text-foreground/50 mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, nisi!</p>
        <div className="relative flex-1 rounded-tl-xl rounded-bl-xl">
          <ClientOnly>
            <AuthBannerImage />
          </ClientOnly>
        </div>
      </div>
    </main>
  )
}