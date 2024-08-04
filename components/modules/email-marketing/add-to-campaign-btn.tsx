"use client";

import { addCustomersToCampaigns } from "@/actions/campaigns";
import { useCampaignStore } from "@/components/hooks/use-campaign-store";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { handleError } from "@/utils/error";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddToCampaignBtn() {
  const [loading, setLoading] = useState(false);
  const { selectedCustomers, setSelectedCustomers, selectedCampaign, setSelectedCampaign, setReset } = useCampaignStore();

  async function handleAddToCampaign() {
    setLoading(true);
    try {
      await addCustomersToCampaigns(selectedCampaign!, selectedCustomers);
      setSelectedCustomers([]);
      setSelectedCampaign(null);
      setReset();
      setLoading(false);
      toast.success("Successfully added customers to a campaigns");
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  }
  return (
    <Button onClick={handleAddToCampaign} disabled={loading || !selectedCampaign || !selectedCustomers.length} variant="outline" size="sm" className="flex items-center gap-2">
      {loading ? <Spinner /> : <Plus className="size-4" />}

      <span>Add to Campaign</span>
    </Button>
  )
}