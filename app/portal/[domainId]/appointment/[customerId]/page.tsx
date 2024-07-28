import { getAppointments, getAppointmentsByDomain } from "@/actions/appointments";
import { getSurveyQuestions } from "@/actions/survey-questions";
import { getSurveys } from "@/actions/surveys";
import AppointmentOnboarding from "@/components/modules/appointment/appointment-onboarding";
import { CheckCheckIcon } from "lucide-react";

export default async function AppointmentBooking({ params, searchParams }: { params: { domainId: string, customerId: string }, searchParams: { status: string } }) {
  const questions = await getSurveyQuestions(params.domainId);
  const surveys = await getSurveys({
    customerId: params.customerId,
    domainId: params.domainId,
  });
  const appointments = await getAppointmentsByDomain(params.domainId);

  if (searchParams.status === 'success') return (
    <div className="flex items-center justify-center flex-col gap-2">
      <span className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-primary">
        <CheckCheckIcon className="text-primary size-10" />
      </span>
      <h3 className="text-2xl font-semibold mt-5">Thank You</h3>
      <p className="text-center font-medium text-foreground/50">Thank you for taking the time to fill in the form and booking an appointment.<br /> We look forward to speaking to you soon.</p>
      <Link href="/">
        <Button variant="link">Go to Home</Button>
      </Link>
    </div>
  )
  return (
    <AppointmentOnboarding
      questions={questions}
      answers={surveys}
      appointments={appointments}
      domainId={params.domainId}
      customerId={params.customerId}
    />
  )
}