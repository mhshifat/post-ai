import { getBlogs } from "@/actions/blogs";
import ProductCard from "@/components/modules/blogs/product-card";

export default async function BlogsPage() {
  const blogs = await getBlogs();
  
  return (
    <div className="container py-10 gap-7 flex-wrap grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {blogs.map(b => (
        <ProductCard
          key={b.id}
          blog={b}
        />
      ))}
    </div>
  )
}