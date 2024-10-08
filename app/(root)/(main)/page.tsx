import { getAllBlogs } from "@/actions/blogs";
import Header from "@/components/layouts/header";
import ProductCard from "@/components/modules/blogs/blog-card";
import BgImage from "@/components/modules/home/bg-image";
import GetStartedPlanBtn from "@/components/modules/settings/get-started-plan-btn";
import { plans } from "@/utils/constants";
import { CheckIcon } from "lucide-react";

export default async function Home() {
  const blogs = await getAllBlogs();

  return (
    <main className="w-full min-h-screen flex flex-col pb-40 bg-background text-foreground">
      <Header />

      <div className="mt-20 flex justify-center items-center flex-col p-5">
        <p className="border border-primary bg-primary/10 py-1 px-4 rounded-3xl text-sm font-semibold text-primary">An Ai Powered Sales Assistant</p>

        <h1 className="mt-20 text-9xl font-semibold text-primary">Post AI</h1>
        <p className="mt-10 font-semibold text-base max-w-[600px] text-center text-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa doloremque officiis corporis inventore omnis.</p>

        <div className="mt-10 relative w-[80%] aspect-[5/3] overflow-hidden rounded-lg">
          <BgImage />
        </div>

        <h3 className="mt-20 text-2xl font-semibold text-foreground">Choose What Fits You Right</h3>
        <p className="mt-2 text-foreground/70 font-semibold text-base max-w-[600px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa doloremque officiis corporis inventore omnis.</p>

        <div className="mt-10 w-full max-w-[1200px] items-center justify-center flex gap-5 flex-wrap">
          {plans.map(plan => (
            <div key={plan.id} className="border border-border p-5 flex-1 rounded-lg min-w-96">
              <h3 className="uppercase text-lg font-bold text-primary">{plan.title}</h3>
              <p className="text-foreground/70 font-semibold text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <h4 className="my-5 text-3xl font-bold text-foreground">
                <span>${plan.price}</span>
                <span className="text-sm text-foreground/70 font-semibold ml-1">/month</span>
              </h4>

              <ul className="flex gap-2 flex-col">
                {plan.benefits.map((text, idx) => (
                  <li key={text + idx} className="flex items-start gap-1 text-sm font-semibold text-foreground/70">
                    <CheckIcon className="size-4 shrink-0 m-1" />
                    {text}
                  </li>
                ))}
              </ul>

              <GetStartedPlanBtn
                name={plan.title}
                price={plan.price}
              />
            </div>
          ))}
        </div>
      </div>

      {!!blogs.length && (
        <div className="mt-20 flex justify-center items-center flex-col max-w-[1200px] mx-auto">
          <h3 className="text-2xl font-semibold text-foreground">Recent Blog Posts</h3>
          <p className="mt-2 text-foreground/70 font-semibold text-base max-w-[600px] text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi culpa doloremque officiis corporis inventore omnis.</p>

          <div className="py-10 gap-7 flex-wrap grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] content-center">
            {blogs.map(b => (
              <ProductCard
                key={b.id}
                blog={b}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
