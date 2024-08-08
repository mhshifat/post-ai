import { getSurveyQuestions } from "@/actions/survey-questions";
import { getSurveys } from "@/actions/surveys";
import PaymentOnboarding from "@/components/modules/appointment/payment-onboarding";
import SuccessfulPayment from "@/components/modules/appointment/successful-payment";

export default async function Appointment({ params, searchParams }: { params: { domainId: string, customerId: string }, searchParams: { redirect_status: string } }) {
  const questions = await getSurveyQuestions(params.domainId);
  const surveys = await getSurveys({
    customerId: params.customerId,
    domainId: params.domainId,
  });
  if (searchParams.redirect_status === 'succeeded') return <SuccessfulPayment domainId={params.domainId} />
  return (
    <PaymentOnboarding
      questions={questions}
      answers={surveys}
      domainId={params.domainId}
      customerId={params.customerId}
    />
  )
}