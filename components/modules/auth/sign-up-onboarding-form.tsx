"use client";

import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Steps from "@/components/ui/steps";
import { cn } from "@/lib/utils";
import { User2Icon } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/shared/spinner";
import { SignUpFormSchema } from "./user-details-form";

const UserDetailsForm = dynamic(() => import('./user-details-form'), {
  ssr: false,
  loading: Spinner
})

const OtpForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: Spinner
})

export default function SignUpOnboardingForm() {
  const [accountType, setAccountType] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<SignUpFormSchema>();

  return (
    <Steps
      className="h-full flex flex-col"
    >
      <Steps.Item
        identifier={0}
      >
        <div className="flex flex-col gap-5">
          <Checkbox
            type="radio"
            className="flex flex-col gap-5"
            renderItem={({ title, metadata, isChecked }) => (
              <div className={cn("relative p-3 border border-border rounded-sm shadow-inner flex items-center gap-5", {
                "border-primary": isChecked
              })}>
                {isChecked && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />}

                <span className={cn("h-full aspect-square border border-border rounded-sm flex justify-center items-center p-3", {
                  "border-primary": isChecked
                })}>
                  <User2Icon
                    {...isChecked?{
                      color: "#007DFC"
                    }:{}}
                  />
                </span>

                <span className="flex flex-col justify-center">
                  <h3 className="text-base font-semibold">{title}</h3>
                  {metadata && <p className="text-sm mt-1 text-foreground/50">{metadata?.description as ReactNode}</p>}
                </span>
              </div>
            )}
            onChange={({ checked, item }) => checked && setAccountType(item)}
          >
            <Checkbox.Item
              title="I own a business"
              value="business"
              metadata={{
                description: "Setting up my account for my company",
              }}
            />
            <Checkbox.Item
              title="I am a student"
              value="student"
              metadata={{
                description: "Setting up my account for my company",
              }}
            />
          </Checkbox>
          <Steps.Trigger asChild type="next">
            <Button disabled={accountType === null} className="w-full">Continue</Button>
          </Steps.Trigger>
          <Link href="/sign-in" className="text-center">Already have an account? <strong>Sign In</strong></Link>
        </div>
      </Steps.Item>

      <Steps.Item
        identifier={1}
      >
        <div className="flex flex-col gap-5">
          <UserDetailsForm onSubmit={(values) => setUserDetails(values)} />
        </div>
      </Steps.Item>

      <Steps.Item
        identifier={2}
      >
        <div className="flex flex-col gap-5">
          <OtpForm metadata={{
            ...userDetails!,
            accountType: accountType!
          }} />
        </div>
      </Steps.Item>

      <Steps.Progress
        className="list-none p-0 flex items-center gap-3 mt-auto"
        renderItem={({ currentStep, currentIndex }) => (
          <span className={cn("cursor-pointer flex-1 h-2 rounded-full bg-slate-300 flex items-center justify-center", {
            "bg-primary": currentIndex === currentStep
          })} />
        )}
      />
    </Steps>
  )
}