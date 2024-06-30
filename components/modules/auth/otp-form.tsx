import OTPInput from "@/components/ui/otp-input";
import { useSignUp } from "@clerk/nextjs";
import { ClerkAPIResponseError } from '@clerk/shared/error';
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateClerkUserDetailsAfterSignUp } from "@/actions/users";
import { SignUpFormSchema } from "./user-details-form";

export default function OtpForm({ metadata }: { metadata: SignUpFormSchema & { accountType: string } }) {
  const router = useRouter(); 
  const { signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);

  async function handleOtpVerification(pin: string) {
    setLoading(true);
    try {
      const res = await signUp?.attemptEmailAddressVerification({
        code: pin
      });
      setActive?.({
        session: res?.createdSessionId,
      });
      await updateClerkUserDetailsAfterSignUp(metadata);
      router.push("/dashboard");
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <OTPInput
      length={6}
      onComplete={handleOtpVerification}
      disabled={loading}
    />
  )
}