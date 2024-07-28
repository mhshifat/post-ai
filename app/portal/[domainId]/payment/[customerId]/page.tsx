import { getSurveyQuestions } from "@/actions/survey-questions";
import { getSurveys } from "@/actions/surveys";
import PaymentOnboarding from "@/components/modules/appointment/payment-onboarding";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "lucide-react";
import Link from "next/link";

export default async function Appointment({ params, searchParams }: { params: { domainId: string, customerId: string }, searchParams: { redirect_status: string } }) {
  const questions = await getSurveyQuestions(params.domainId);
  const surveys = await getSurveys({
    customerId: params.customerId,
    domainId: params.domainId,
  });
  if (searchParams.redirect_status === 'succeeded') return (
    <div className="flex items-center justify-center flex-col gap-2">
      <span className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-primary">
        <CheckCheckIcon className="text-primary size-10" />
      </span>
      <h3 className="text-2xl font-semibold mt-5">Thank You</h3>
      <p className="text-center font-medium text-foreground/50">Thank you for your purchase.</p>
      <Link href="/">
        <Button variant="link">Go to Home</Button>
      </Link>
    </div>
  )
  return (
    <PaymentOnboarding
      questions={questions}
      answers={surveys}
      domainId={params.domainId}
      customerId={params.customerId}
    />
  )
}