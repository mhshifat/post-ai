import { updateCampaign } from "@/actions/campaigns";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ICampaign } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  default_template: z.string(),
})

export type EditEmailFormSchema = z.infer<typeof formSchema>;

export default function EditEmailForm({ onSubmit, campaignId, defaultValues }: { onSubmit: (formValues: EditEmailFormSchema) => void; campaignId: string, defaultValues: Partial<ICampaign> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<EditEmailFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      default_template: defaultValues.default_template || "",
    }
  });
  
  async function handleSubmit(values: EditEmailFormSchema) {
    setLoading(true);
    try {
      await updateCampaign({
        id: campaignId,
        default_template: values.default_template
      });
      router.refresh();
      toast.success("Successfully updated the email");
      onSubmit?.(values);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="default_template"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Email Template" />
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