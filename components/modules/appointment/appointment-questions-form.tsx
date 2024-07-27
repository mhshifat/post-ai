"use client";

import { bulkUpsertSurveys } from "@/actions/surveys";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Steps from "@/components/ui/steps";
import { ISurvey, ISurveyQuestion } from "@/utils/types";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { string, z } from "zod";

const formSchema = z.object({
  survey_answers: z.array(
    z.object({
      answer: string(),
      surveyQuestionId: string(),
      domainId: string(),
      customerId: string(),
      id: string().optional(),
    }).required()
  ).superRefine((surveyAnswers, ctx) => {
    surveyAnswers.forEach((item, idx) => {
      if (!item.answer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Need to fill up the answer",
          path: [`${idx}.answer`],
        })
      }
    })
  })
});

export type AppointmentQuestionsFormSchema = z.infer<typeof formSchema>;

interface AppointmentQuestionsFormProps {
  questions: Partial<ISurveyQuestion>[], 
  answers: Partial<ISurvey>[], 
  domainId: string, 
  customerId: string
}

export default function AppointmentQuestionsForm({ questions, answers, domainId, customerId }: AppointmentQuestionsFormProps) {
  const triggerRef = useRef<{ handleStep: () => void; }>({
    handleStep: () => {}
  });
  const [loading, setLoading] = useState(false);
  const form = useForm<AppointmentQuestionsFormSchema>({
    mode: "all",
    defaultValues: {
      survey_answers: questions.map(q => ({
        answer: answers?.find(a => a.surveyQuestionId === q.id)?.answer || "",
        surveyQuestionId: q.id,
        domainId,
        customerId,
        id: answers?.find(a => a.surveyQuestionId === q.id)?.id || ""
      })),
    },
    resolver: zodResolver(formSchema)
  });
  const formFields = useFieldArray({
    control: form.control,
    name: "survey_answers"
  });

  async function handleSubmit(values: AppointmentQuestionsFormSchema) {
    setLoading(true);
    try {
      await bulkUpsertSurveys(values.survey_answers);
      toast.success("Successfully save the answers");
      triggerRef.current.handleStep();
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
        {formFields?.fields?.map((fieldItem, idx) => (
          <FormField
            key={fieldItem.id}
            name={`survey_answers.${idx}.answer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{questions.find(q => q.id === fieldItem.surveyQuestionId)?.question || "N/A"}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Steps.Trigger ref={triggerRef} type="next" />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Spinner /> : "Continue"}
        </Button>
      </form>
    </Form>
  )
}