import { changeClerkUserPassword } from "@/actions/users";
import { useDialog } from "@/components/providers/dialog-provider";
import Confirmation from "@/components/shared/confirmation";
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
  password: z.string(),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ChangePasswordFormSchema = z.infer<typeof formSchema>;

export default function ChangePasswordForm({ onSubmit }: { onSubmit: (formValues: ChangePasswordFormSchema) => void }) {
  const [loading, setLoading] = useState(false);
  const { openDialog, closeDialog } = useDialog();
  const form = useForm<ChangePasswordFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  async function handleChangePassword(values: ChangePasswordFormSchema) {
    await changeClerkUserPassword(values.password);
    closeDialog();
    setLoading(false);
    toast.success("Successfully changed the password");
  }
  
  function handleSubmit(values: ChangePasswordFormSchema) {
    setLoading(true);
    try {
      openDialog({
        title: "Are you sure?",
        description: "Are you sure you want to change the password?",
        content: <Confirmation
          onCancel={closeDialog}
          onOk={() => handleChangePassword(values)}
        />
      })
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
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
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Confirm Password" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full mt-1">
          {loading ? "Loading..." : "Change Password"}
        </Button>
      </form>
    </Form>
  )
}