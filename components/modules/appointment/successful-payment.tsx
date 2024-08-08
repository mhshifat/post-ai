"use client";

import { createNotification } from "@/actions/notifications";
import useDomain from "@/components/hooks/use-domain";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessfulPayment({ domainId }: { domainId: string }) {
  const { domainDetails } = useDomain({ domainId });

  useEffect(() => {
    if (!domainDetails) return;
    createNotification({
      domainId: domainDetails?.id,
      content: `<span class="text-primary cursor-pointer">@Anonymous</span> has purchased a product from <span  class="text-primary cursor-pointer">${domainDetails?.domain}</span>.`
    });
  }, [domainDetails])

  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <span className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-primary">
        <CheckCheckIcon className="text-primary size-10" />
      </span>
      <h3 className="text-2xl font-semibold mt-5">Thank You</h3>
      <p className="text-center font-medium text-foreground/50">Thank you for your purchase.</p>
      <Link href="/">
        <Button variant="link">Go to Home</Button>
      </Link>
    </div>
  )
}