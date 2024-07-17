import AppointmentOnboarding from "@/components/modules/appointment/appointment-onboarding";

export default function AppointmentBooking() {
  if (false) return (
    <div className="flex items-center justify-center flex-col gap-2">
      <h3 className="text-2xl font-semibold">Thank You</h3>
      <p className="text-center font-medium text-foreground/50">Thank you for taking the time to fill in the form and booking an appointment.<br /> We look forward to speaking to you soon.</p>
    </div>
  )
  return (
    <AppointmentOnboarding />
  )
}