"use client";

import { upsertBot } from "@/actions/bots";
import Uploader from "@/components/shared/uploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IChatBot } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  greeting: z.string(),
  logo: z.string(),
})

export type ChatbotFormSchema = z.infer<typeof formSchema>;

export default function ChatbotForm({ onSubmit, domainId, defaultValues }: { onSubmit?: () => void; domainId: string; defaultValues?: Partial<IChatBot> }) {  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<ChatbotFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      greeting: defaultValues?.welcomeText || "",
      logo: defaultValues?.logo || "",
    }
  });
  
  async function handleSubmit(values: ChatbotFormSchema) {
    setLoading(true);
    try {
      await upsertBot({
        logo: values.logo,
        welcomeText: values.greeting,
        domainId,
        ...defaultValues?.id?{
          id: defaultValues.id
        }:{}
      });
      toast.success("Successfully saved chatbot settings");
      router.refresh();
      onSubmit?.();
    } catch (err) {
      const message = (err as Error)?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="logo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Uploader
                  values={[{
                    url: field.value,
                    id: field.value
                  }]}
                  onChange={(values) => field.onChange(values?.[0]?.id)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="greeting"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Welcome message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!Object.keys(form.formState.dirtyFields).length || loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}