"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import EditEmailForm from "./edit-email-form";
import { ICampaign } from "@/utils/types";

export default function EditEmailBtnWrapper({ campaign }: { campaign: Partial<ICampaign> }) {
  const { openDialog, closeDialog } = useDialog();

  return (
    <Button variant='link' onClick={() => openDialog({
      title: "Edit Email Content",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis?",
      content: <EditEmailForm defaultValues={{
        default_template: campaign.default_template
      }} campaignId={campaign.id!} onSubmit={closeDialog} />
    })}>Edit Email</Button>
  )
}