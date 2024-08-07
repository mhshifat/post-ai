import { getBlogDetailsWithSlug } from "@/actions/blogs"
import Editor from "@/components/shared/editor";
import { formatISODate } from "@/utils/date";
import Image from "next/image";

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogDetailsWithSlug(params.slug);

  return (
    <div className="container py-10 text-foreground">
      <h1 className="text-5xl font-medium">{blog?.title}</h1>
      <p className="text-sm font-medium mt-8 text-foreground/50">{formatISODate(blog?.createdAt!)} by {blog?.user?.firstName} {blog?.user?.lastName}</p>

      <div className="relative mt-8 w-full aspect-[2/1] rounded-lg overflow-hidden">
        <Image
          src={blog?.thumbnail!}
          alt={blog?.title!}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative mt-8 w-full rounded-lg overflow-hidden">
        <Editor
          value={blog?.content}
        />
      </div>
    </div>
  )
}