"use client";

import { createQuestion } from "@/actions/questions";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  question: z.string(),
  answer: z.string().nullable().default(null),
})

export type FilterQuestionFormSchema = z.infer<typeof formSchema>;

export default function FilterQuestionForm({ onSubmit, domainId }: { onSubmit?: () => void; domainId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<FilterQuestionFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    }
  });
  
  async function handleSubmit(values: FilterQuestionFormSchema) {
    setLoading(true);
    try {
      await createQuestion({
        answer: values.answer,
        question: values.question,
        domainId,
        type: "FILTERED_QUESTIONS"
      });
      form.reset();
      router.refresh();
      toast.success("Successfully saved filter question");
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
          name="question"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Question" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="answer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea value={field.value || ""} onBlur={field.onBlur} onChange={field.onChange} placeholder="Answer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Form>
  )
}