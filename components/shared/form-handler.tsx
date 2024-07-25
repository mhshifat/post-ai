import { ReactElement, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import Spinner from "./spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { Form } from "../ui/form";

interface FormHandlerProps<IResource> {
  defaultValues: Partial<IResource>;
  onComplete: (record: IResource | null) => void;
  createHandler: (values: Partial<IResource>) => Promise<IResource | null>;
  updateHandler?: (values: Partial<IResource>) => Promise<IResource | null>;
  schema: ZodSchema;
  children: (args: { form: UseFormReturn<Partial<IResource>, unknown, undefined> }) => ReactElement;
}

export default function FormHandler<IResource extends Record<string, unknown> & { id?: string }>({ children, defaultValues, onComplete, createHandler, updateHandler, schema }: FormHandlerProps<IResource>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    defaultValues: {
      ...defaultValues?defaultValues:{}
    },
    resolver: zodResolver(schema)
  });
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      let res: IResource | null = null;
      if (!defaultValues.id) res = await createHandler(values);
      else res = await updateHandler?.(values) || null;
      router.refresh();
      onComplete?.(res);
      toast.success(`Successfully ${defaultValues.id ? "updated the" : "created a"} record`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message)
      }
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        {children({ form })}

        <Button disabled={!Object.keys(form.formState.dirtyFields).length || loading} type="submit" className="w-full">
          {loading ? <Spinner /> : defaultValues.id ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  )
}