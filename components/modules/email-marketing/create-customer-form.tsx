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

const formSchema = z.object({
  email: z.string(),
  domain: z.string(),
})

export type CreateCustomerFormSchema = z.infer<typeof formSchema>;

export default function CreateCustomerForm({ onSubmit, domains }: { onSubmit: (formValues: CreateCustomerFormSchema) => void; domains: Partial<IDomain>[] }) {
  const router = useRouter();
  const [newDomains, setNewDomains] = useState(domains);
  const { openDialog, closeDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateCustomerFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      domain: "",
    }
  });

  
  async function handleSubmit(values: CreateCustomerFormSchema) {
    setLoading(true);
    try {
      await createCustomer({
        domainId: values.domain,
        email: values.email,
      });
      toast.success("Successfully created a new customer");
      router.refresh();
      closeDialog?.();
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" {...field} placeholder="Email Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="domain"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  value={newDomains.filter(d => d.id === field.value).map(d => ({
                    content: d.domain!,
                    value: d.id!
                  }))}
                  onChange={(value) => field.onChange(value)}
                >
                  <Select.Trigger>
                    <Select.Placeholder>Select Domain</Select.Placeholder>
                  </Select.Trigger>
                  <Select.Content>
                    {newDomains.map(domain => (
                      <Select.Option key={domain.id} value={domain.id}>{domain.domain}</Select.Option>
                    ))}
                    <Select.Option
                      onClick={() => openDialog({
                        title: "Create a new domain",
                        description: "Please provide the necessary options to create the domain",
                        content: <CreateDomainForm onSubmit={(domain) => {
                          if (domain) {
                            setNewDomains(values => [domain, ...values])
                            closeDialog();
                          }
                        }} />
                      })}
                    >
                      <Button variant="link" size='sm' className="flex items-center gap-2 p-0 h-auto">
                        <Plus className="size-4" />

                        <span>Create New</span>
                      </Button>
                    </Select.Option>
                  </Select.Content>
                </Select>
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