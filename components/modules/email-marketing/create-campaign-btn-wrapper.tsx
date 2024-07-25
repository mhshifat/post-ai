"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateCampaignForm from "./create-campaign-form";

export default function CreateCampaignBtnWrapper() {
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button onClick={() => openDialog({
      title: "Create a new campaign",
      description: "Please fill up the form below to create a new campaign",
      content: <CreateCampaignForm onSubmit={closeDialog} />
    })} variant="outline" size="sm" className="flex items-center gap-2">
      <Plus className="size-4" />

      <span>Create Campaign</span>
    </Button>
  )
}