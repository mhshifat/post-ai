import { getAllBlogs } from "@/actions/blogs";
import BlogCard from "@/components/modules/blogs/blog-card";
import NotFound from "@/components/shared/not-found";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  
  return (
    <>
      {!blogs.length && (
        <NotFound />
      )}
      <div className="container py-10 gap-7 flex-wrap grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
        {blogs.map(b => (
          <BlogCard
            key={b.id}
            blog={b}
          />
        ))}
      </div>
    </>
  )
}