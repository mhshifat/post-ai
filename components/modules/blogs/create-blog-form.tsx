"use client";

import { createBlog, updateBlog } from "@/actions/blogs";
import Editor from "@/components/shared/editor";
import FormHandler from "@/components/shared/form-handler";
import Uploader from "@/components/shared/uploader";
import ClientOnly from "@/components/ui/client-only";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IBlog } from "@/utils/types";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function CreateBlogForm() {
  const router = useRouter();

  return (
    <FormHandler<Partial<IBlog>>
      defaultValues={{
        title: "",
        thumbnail: "",
        content: "",
        excerpt: "",
      }}
      createHandler={async (values) => createBlog(values)}
      // updateHandler={async (values) => updateBlog(values)}
      onComplete={() => {
        router.push("/blogs");
      }}
      schema={z.object({
        title: z.string(),
        thumbnail: z.string(),
        excerpt: z.string(),
        content: z.string(),
      })}
    >
      {({ form }) => (
        <>
          <FormField
            name="thumbnail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <ClientOnly>
                    <Uploader
                      // values={[{
                      //   url: field.value,
                      //   id: field.value
                      // }]}
                      onChange={(values) => field.onChange(values?.[0]?.url)}
                    />
                  </ClientOnly>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="excerpt"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ClientOnly>
                    <Editor
                      onChange={(value) => field.onChange(value)}
                    />
                  </ClientOnly>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </FormHandler>
  )
}