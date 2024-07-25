"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateCustomerForm from "./create-customer-form";
import { IDomain } from "@/utils/types";
import { useRouter } from "next/navigation";

interface CreateCustomerBtnWrapperProps {
  domains: Partial<IDomain>[];
}

export default function CreateCustomerBtnWrapper({ domains }: CreateCustomerBtnWrapperProps) {
  const router = useRouter();
  const { openDialog } = useDialog();

  return (
    <Button onClick={() => openDialog({
      title: "Create new customer",
      description: "Please insert the necessary information to create a customer",
      content: <CreateCustomerForm
        onSubmit={() => router.refresh()}
        domains={domains}
      />
    })} variant="outline" size="sm" className="flex items-center gap-2">
      <Plus className="size-4" />

      <span>Create Customer</span>
    </Button>
  )
}