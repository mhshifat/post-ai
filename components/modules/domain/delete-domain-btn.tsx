"use client";

import { deleteDomain } from "@/actions/domains";
import { useDialog } from "@/components/providers/dialog-provider";
import Confirmation from "@/components/shared/confirmation";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteDomainBtn({ domainId }: { domainId: string }) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [loading, setLoading] = useState(false);

  async function handleDeleteDomain() {
    await deleteDomain(domainId);
    toast.success("Successfully deleted the domain");
    router.refresh();
    closeDialog();
  }

  function handleClick() {
    setLoading(true);
    try {
      openDialog({
        title: "Are you sure?",
        description: "Are you sure you want to delete the domain?",
        content: <Confirmation
          onCancel={closeDialog}
          onOk={handleDeleteDomain}
        />
      });
    } catch (err) {
      if (err instanceof Error) {
        const message = err?.message;
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="destructive" onClick={handleClick}>{loading ? <Spinner /> : "Delete Domain"}</Button>
  )
}