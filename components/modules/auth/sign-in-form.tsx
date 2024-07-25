"use client";

import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SignInFormSchema = z.infer<typeof formSchema>;

export default function SignInForm() {
  const { signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  async function handleSubmit(values: SignInFormSchema) {
    setLoading(true);
    try {
      const res = await signIn?.create({
        identifier: values.email,
        password: values.password
      });
      if (!res) throw new Error("Something went wrong!");
      setActive?.({ session: res?.createdSessionId })
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage || (err as Error)?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
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
          {loading ? <Spinner /> : "Login"}
        </Button>
        <Link href="/sign-up" className="text-center">Don't have an account? <span className="underline text-primary font-medium text-base">Create One</span></Link>
      </form>
    </Form>
  )
}