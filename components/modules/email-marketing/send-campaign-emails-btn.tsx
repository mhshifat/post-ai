"use client";

import { sendEmailToCampaignUsers } from "@/actions/campaigns";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { handleError } from "@/utils/error";
import { useState } from "react";
import { toast } from "sonner";

export default function SendCampaignEmailsBtn({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSendEmails() {
    setLoading(true);
    try {
      await sendEmailToCampaignUsers(campaignId);
      setLoading(false);
      toast.success("Successfully sent emails");
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  }
  
  return (
    <Button variant="outline" size="sm" onClick={handleSendEmails}>
      {loading ? <Spinner /> : "Send"}
    </Button>
  )
}