import SignInForm from "@/components/modules/auth/sign-in-form";
import { SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await currentUser();

  if (user) return redirect("/dashboard");
  return (
    <div className="flex-1 w-full h-full flex flex-col">
      <h2 className="font-serif font-semibold text-2xl mb-2 tracking-wide">Login!</h2>
      <p className="font-sans text-base text-foreground/50 mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae, nisi!</p>
      
      <SignInForm />
    </div>
  )
}