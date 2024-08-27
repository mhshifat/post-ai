import Link from "next/link";
import Logo from "../shared/logo";
import { Button } from "../ui/button";
import { getUserDetails } from "@/actions/users";
import { UserButton } from '@clerk/nextjs';

interface HeaderProps {
  page?: "blogs";
}

export default async function Header({ page }: HeaderProps) {
  const user = await getUserDetails();

  return (
    <div className="w-full flex items-center gap-5 justify-between p-5">
      <Link href="/"><Logo className="h-7 w-max" /></Link>

      {page === "blogs" ? (
        <div className="flex items-center gap-5">
          {user ? (
            <>
              <Link href="/dashboard"><Button className="text-primary-foreground" variant="ghost" size="sm">Dashboard</Button></Link>
              {user?.email === process.env.ADMIN_EMAIL && (
                <Link href="/blogs/create"><Button className="bg-primary rounded-md text-primary-foreground" size="sm">Create</Button></Link>
              )}
              <UserButton />
            </>
          ) : (
            <Link href="/sign-up"><Button className="bg-primary rounded-md text-primary-foreground" size="sm">Get Started</Button></Link>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link href="/blogs"><Button className="text-primary-foreground" variant="ghost" size="sm">Blogs</Button></Link>
          {user ? (
            <>
              <Link href="/dashboard"><Button className="text-primary-foreground" variant="ghost" size="sm">Dashboard</Button></Link>
              <UserButton />
            </>
          ) : (
            <Link href="/sign-up"><Button className="bg-primary rounded-md text-primary-foreground" size="sm">Get Started</Button></Link>
          )}
        </div>
      )}
    </div>
  )
}