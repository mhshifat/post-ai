"use client";

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
  title: z.string(),
  image: z.string(),
  price: z.number(),
})

export type CreateProductFormSchema = z.infer<typeof formSchema>;

export default function CreateProductForm({ onSubmit }: { onSubmit?: () => void }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreateProductFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: "",
      price: 0,
    }
  });
  
  async function handleSubmit(values: CreateProductFormSchema) {
    setLoading(true);
    try {
      // TODO:
      toast.success("Successfully created a product");
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
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} placeholder="Price" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
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