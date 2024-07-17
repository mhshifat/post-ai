import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Steps from "@/components/ui/steps";
import { Textarea } from "@/components/ui/textarea";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  content: z.string(),
})

export type EditEmailFormSchema = z.infer<typeof formSchema>;

export default function EditEmailForm({ onSubmit }: { onSubmit: (formValues: EditEmailFormSchema) => void }) {
  const [loading, setLoading] = useState(false);
  const triggerRef = useRef<{ handleStep: () => void; }>({
    handleStep: () => {}
  });
  const form = useForm<EditEmailFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });
  
  async function handleSubmit(values: EditEmailFormSchema) {
    setLoading(true);
    try {
      // TODO:
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
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="First name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}