import SignUpOnboardingForm from "@/components/modules/auth/sign-up-onboarding-form";
import ClientOnly from "@/components/ui/client-only";

export default async function SignUpPage() {
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      <h2 className="font-bold text-2xl tracking-wide leading-10 uppercase text-foreground/80">Create an account!</h2>
      <p className="font-sans text-base text-foreground/50 mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, nisi!</p>
      
      <ClientOnly>
        <SignUpOnboardingForm />
      </ClientOnly>
    </div>
  )
}