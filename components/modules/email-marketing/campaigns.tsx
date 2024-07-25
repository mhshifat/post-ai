"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, User2Icon } from "lucide-react";
import EditEmailBtnWrapper from "./edit-email-btn-wrapper";
import CreateCampaignBtnWrapper from "./create-campaign-btn-wrapper";
import { ICampaign } from "@/utils/types";
import { formatDate, formatISODate } from "@/utils/date";
import NotFound from "@/components/shared/not-found";
import { cn } from "@/lib/utils";
import DeleteCampaignBtnWrapper from "./delete-campaign-btn-wrapper";

interface CampaignsProps {
  campaigns: Partial<ICampaign>[];
}

export default function Campaigns({ campaigns }: CampaignsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2">
        {/* TODO: Make it functional */}
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="size-4" />

          <span>Add to Campaign</span>
        </Button>
        <CreateCampaignBtnWrapper />
        {/* TODO: Make it functional */}
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <span>10 Credits</span>
        </Button>
      </div>

      <div className="w-full pt-5">
        {campaigns.map((campaign, idx) => (
          <div key={campaign.id} className={cn("border border-border p-5 cursor-pointer", {
            "rounded-tl-xl rounded-tr-xl": idx === 0,
            "rounded-bl-xl rounded-br-xl": idx === (campaigns.length - 1),
          })}>
            <div className="flex items-center gap-5 justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-foreground/50" />
                <span className="text-sm font-normal text-foreground/50">{formatISODate(campaign.createdAt as Date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User2Icon className="size-4 text-foreground/50" />
                {/* TODO: make it dynamic */}
                <span className="text-sm font-normal text-foreground/50">0 Customers Added</span>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-5">
              <h3  className="text-2xl font-semibold text-foreground">{campaign.title}</h3>
              
              <div className="flex items-center gap-2 ml-auto">
                <EditEmailBtnWrapper
                  key={String(campaign.updatedAt)}
                  campaign={campaign}
                />
                {/* TODO: Make it functional */}
                <Button variant="outline" size="sm">Send</Button>
                <DeleteCampaignBtnWrapper campaignId={campaign.id!} />
              </div>
            </div>
          </div>
        ))}
        {!campaigns.length && (
          <div className="border border-border rounded-xl">
            <NotFound />
          </div>
        )}
      </div>
    </div>
  )
}