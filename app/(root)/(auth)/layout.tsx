import Logo from "@/components/shared/logo";
import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
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

      <div className="flex-[1_0_0] py-8 px-10 bg-slate-100 flex flex-col overflow-hidden">
        <h2 className="font-serif font-semibold text-3xl mb-2 uppercase tracking-wide">Hi, I am your AI powered<br/> sales assistant</h2>
        <p className="font-sans text-base text-foreground/50 mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, nisi!</p>
        <div className="relative flex-1">
          <Image
            fill
            src="/images/product-cover.png"
            alt=""
            className="object-cover object-left-top overflow-x-visible !w-[150%] max-w-screen-2xl"
          />
        </div>
      </div>
    </main>
  )
}