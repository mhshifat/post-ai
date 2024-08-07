import Divider from "@/components/ui/divider";
import { formatISODate } from "@/utils/date";
import { IBlogsWithUser } from "@/utils/types"
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  blog: IBlogsWithUser[0];
}

export default function ProductCard({ blog }: ProductCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="text-foreground border border-border p-5 rounded-lg overflow-hidden w-full flex flex-col gap-5">
      <div className="border border-border rounded-md overflow-hidden relative aspect-[2/1.4]">
        <Image
          src={blog?.thumbnail || "/images/no-image-removebg-preview.png"}
          fill
          alt=""
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div>
          <h3 className="text-lg font-medium text-balance">{blog?.title}</h3>
          <p className="text-sm font-normal text-foreground/50 mt-2">{blog?.excerpt}</p>
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <Divider className="my-5" />
          <div className="flex items-center gap-5 justify-between text-foreground/50 text-sm font-medium">
            <span>{blog?.user?.firstName} {blog?.user?.lastName}</span>
            <span>{formatISODate(blog?.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}