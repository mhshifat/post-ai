"use client";

import { deleteCampaign } from "@/actions/campaigns";
import DeleteHandler from "@/components/shared/delete-handler";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteCampaignBtnWrapper({ campaignId }: { campaignId: string; }) {
  return (
    <DeleteHandler
      description="Are you sure you want to delete the campaign?"
      handler={async () => {
        await deleteCampaign(campaignId);
      }}
    >
      <Button variant="destructive" size="sm">
        <Trash2 className="size-4" />
      </Button>
    </DeleteHandler>
  )
}