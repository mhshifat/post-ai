import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Steps from "@/components/ui/steps";
import { useSignUp } from "@clerk/nextjs";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type SignUpFormSchema = z.infer<typeof formSchema>;

export default function UserDetailsForm({ onSubmit }: { onSubmit: (formValues: SignUpFormSchema) => void }) {
  const { signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<{ handleStep: () => void; }>({
    handleStep: () => {}
  });
  const form = useForm<SignUpFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }
  });
  
  async function handleSubmit(values: SignUpFormSchema) {
    setLoading(true);
    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code"
      });
      onSubmit?.(values);
      triggerRef.current.handleStep();
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="firstName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="First name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Last name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Password" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Send Otp"}
        </Button>
        <Steps.Trigger ref={triggerRef} type="next" />
        <Link href="/sign-in" className="text-center">Already have an account? <strong>Sign In</strong></Link>
      </form>
    </Form>
  )
}