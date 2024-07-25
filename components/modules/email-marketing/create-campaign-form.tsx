import { useDialog } from "@/components/providers/dialog-provider";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import Steps from "@/components/ui/steps";
import { Textarea } from "@/components/ui/textarea";
import { IDomain } from "@/utils/types";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CreateDomainForm from "../domain/create-domain-form";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/actions/domains";
import { createCampaign } from "@/actions/campaigns";

const formSchema = z.object({
  title: z.string(),
  default_template: z.string(),
})

export type CreateCampaignFormSchema = z.infer<typeof formSchema>;

export default function CreateCampaignForm({ onSubmit }: { onSubmit: (formValues: CreateCampaignFormSchema) => void; }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateCampaignFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      default_template: "",
    }
  });

  
  async function handleSubmit(values: CreateCampaignFormSchema) {
    setLoading(true);
    try {
      await createCampaign({
        title: values.title,
        default_template: values.default_template,
      });
      toast.success("Successfully created a new campaign");
      router.refresh();
      onSubmit?.(values);
    } catch (err) {
      if (err instanceof Error) {
        const message = err.message;
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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