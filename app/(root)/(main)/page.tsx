import { createCustomerSubscription } from "@/actions/stripe";
import GetStartedPlanBtn from "@/components/modules/settings/get-started-plan-btn";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { plans } from "@/utils/constants";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col pb-40">
      <div className="w-full flex items-center gap-5 justify-between p-5">
        <Logo className="h-7 w-max" />

        <Link href="/sign-up"><Button size="sm">Get Started</Button></Link>
      </div>

      <div className="mt-20 flex justify-center items-center flex-col p-5">
        <p className="border border-[#007DFC] bg-[#007DFC]/10 py-1 px-4 rounded-3xl text-sm font-semibold text-[#007DFC]">An Ai Powered Sales Assistant</p>

        <h1 className="mt-20 text-9xl font-semibold text-[#007DFC]">Post AI</h1>
        <p className="mt-10 text-slate-900 font-semibold text-base max-w-[600px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa doloremque officiis corporis inventore omnis.</p>

        <div className="mt-10 relative w-[80%] aspect-[5/3] overflow-hidden rounded-lg">
          <Image
            fill
            src="/images/product-cover.png"
            alt=""
            className="object-cover object-left-top overflow-x-visible w-full h-full"
          />
        </div>

        <h3 className="mt-20 text-2xl font-semibold">Choose What Fits You Right</h3>
        <p className="mt-2 text-slate-500 font-semibold text-base max-w-[600px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa doloremque officiis corporis inventore omnis.</p>

        <div className="mt-10 w-full max-w-[1200px] items-center justify-center flex gap-5 flex-wrap">
          {plans.map(plan => (
            <div key={plan.id} className="border border-slate-200 p-5 flex-1 rounded-lg min-w-96">
              <h3 className="uppercase text-lg font-bold text-[#007DFC]">{plan.title}</h3>
              <p className="text-slate-500 font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <h4 className="my-5 text-3xl font-bold text-slate-900">
                <span>${plan.price}</span>
                <span className="text-sm text-slate-500 font-semibold ml-1">/month</span>
              </h4>

              <ul className="flex gap-2 flex-col">
                {plan.benefits.map((text, idx) => (
                  <li key={text + idx} className="flex items-start gap-1 text-sm font-semibold">
                    <CheckIcon className="size-4 shrink-0 m-1" />
                    {text}
                  </li>
                ))}
              </ul>

              <GetStartedPlanBtn
                name={plan.title}
                price={plan.price}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
