"use client";

import Section from "@/components/shared/section";
import Steps from "@/components/ui/steps";
import { cn } from "@/lib/utils";
import AppointmentQuestionsForm from "./appointment-questions-form";
import AppointmentBookingForm from "./appointment-booking-form";
import PaymentForm from "./payment-form";

export default function PaymentOnboarding() {
  return (
    <Steps
      className="max-w-[800px] w-full flex flex-col gap-10"
    >
      <Steps.Item
        identifier={0}
      >
        <Section>
          <Section.Header className="py-2 px-3">Filtered Questions</Section.Header>
          <Section.Content className="py-2 px-3">
            <AppointmentQuestionsForm />
          </Section.Content>
        </Section>
      </Steps.Item>

      <Steps.Item
        identifier={1}
      >
        <Section>
          <Section.Header className="py-2 px-3">Product Payment</Section.Header>
          <Section.Content className="py-2 px-3">
            <PaymentForm />
          </Section.Content>
        </Section>
      </Steps.Item>

      <Steps.Progress
        className="list-none p-0 flex items-center gap-3 mt-auto px-10"
        renderItem={({ currentStep, currentIndex }) => (
          <span className={cn("cursor-pointer flex-1 h-2 rounded-full bg-slate-300 flex items-center justify-center", {
            "bg-[#007DFC]": currentIndex === currentStep
          })} />
        )}
      />
    </Steps>
  )
}