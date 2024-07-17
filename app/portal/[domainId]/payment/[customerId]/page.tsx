import AppointmentOnboarding from "@/components/modules/appointment/appointment-onboarding";
import PaymentOnboarding from "@/components/modules/appointment/payment-onboarding";

export default function Appointment() {
  // if (false) return (
  //   <div className="flex items-center justify-center flex-col gap-2">
  //     <h3 className="text-2xl font-semibold">Thank You</h3>
  //     <p className="text-center font-medium text-foreground/50">Thank you for your purchase.</p>
  //   </div>
  // )
  return (
    <PaymentOnboarding />
  )
}