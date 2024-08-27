import { getUserDetails } from "@/actions/users";
import CreateBlogForm from "@/components/modules/blogs/create-blog-form";
import { redirect } from "next/navigation";

export default async function CreateBlog() {
  const user = await getUserDetails();
  
  if (user?.email !== process.env.ADMIN_EMAIL) return redirect("/blogs");
  return (
    <div className="container py-10">
      <CreateBlogForm />
    </div>
  )
}