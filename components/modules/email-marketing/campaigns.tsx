"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, User2Icon } from "lucide-react";
import EditEmailBtnWrapper from "./edit-email-btn-wrapper";
import CreateCampaignBtnWrapper from "./create-campaign-btn-wrapper";
import { ICampaignsWithCustomers } from "@/utils/types";
import { formatISODate } from "@/utils/date";
import NotFound from "@/components/shared/not-found";
import { cn } from "@/lib/utils";
import DeleteCampaignBtnWrapper from "./delete-campaign-btn-wrapper";
import AddToCampaignBtn from "./add-to-campaign-btn";
import { useState } from "react";
import { useCampaignStore } from "@/components/hooks/use-campaign-store";
import Alert from "@/components/ui/alert";
import SendCampaignEmailsBtn from "./send-campaign-emails-btn";

interface CampaignsProps {
  campaigns: ICampaignsWithCustomers;
}

export default function Campaigns({ campaigns }: CampaignsProps) {
  const { selectedCampaign, setSelectedCampaign, selectedCustomers } = useCampaignStore();

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2">
        <AddToCampaignBtn />
        <CreateCampaignBtnWrapper />
        {/* TODO: Make it functional */}
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <span>10 Credits</span>
        </Button>
      </div>

      {(!selectedCampaign && !!selectedCustomers.length) && <Alert className="mt-5">Please select a campaign to add the selected customers</Alert>}
      <div className="w-full pt-5">
        {campaigns.map((campaign, idx) => (
          <div key={campaign.id} onClick={() => setSelectedCampaign(campaign.id!)} className={cn("border border-border p-5 cursor-pointer", {
            "rounded-tl-xl rounded-tr-xl": idx === 0,
            "rounded-bl-xl rounded-br-xl": idx === (campaigns.length - 1),
            "border-primary": campaign.id === selectedCampaign,
          })}>
            <div className="flex items-center gap-5 justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 text-foreground/50" />
                <span className="text-sm font-normal text-foreground/50">{formatISODate(campaign.createdAt as Date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User2Icon className="size-4 text-foreground/50" />
                <span className="text-sm font-normal text-foreground/50">{campaign.customersToCampaigns.length} Customers Added</span>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-5">
              <h3  className="text-2xl font-semibold text-foreground">{campaign.title}</h3>
              
              <div className="flex items-center gap-2 ml-auto">
                <EditEmailBtnWrapper
                  key={String(campaign.updatedAt)}
                  campaign={campaign}
                />
                <SendCampaignEmailsBtn
                  campaignId={campaign.id!}
                />
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