import SignUpOnboardingForm from "@/components/modules/auth/sign-up-onboarding-form";

export default async function SignUpPage() {
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      <h2 className="font-serif font-semibold text-2xl mb-2 tracking-wide">Create an account!</h2>
      <p className="font-sans text-base text-foreground/50 mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, nisi!</p>
      
      <SignUpOnboardingForm />
    </div>
  )
}