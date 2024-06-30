import { createDomain } from "@/actions/domains";
import Uploader from "@/components/shared/uploader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  domain: z.string(),
  logo: z.string(),
})

export type CreateDomainFormSchema = z.infer<typeof formSchema>;

export default function CreateDomainForm({ onSubmit }: { onSubmit?: () => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateDomainFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      logo: "",
    }
  });
  
  async function handleSubmit(values: CreateDomainFormSchema) {
    setLoading(true);
    try {
      await createDomain({
        domain: values.domain,
        logo: values.logo,
      });
      toast.success("Successfully created a domain");
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
          name="domain"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Domain" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="logo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Uploader
                  onChange={(values) => field.onChange(values?.[0]?.cdnUrl)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Loading..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}