import { getDomains } from "@/actions/products";
import Campaigns from "./campaigns";
import Customers from "./customers";
import { getCampaigns } from "@/actions/campaigns";
import { getCustomers } from "@/actions/customers";

export default async function EmailMarketingLayout() {
  const domains = await getDomains();
  const customers = await getCustomers();
  const campaigns = await getCampaigns();

  return (
    <div className="w-full h-full p-7 flex gap-10">
      <div className="flex-1">
        <Customers
          domains={domains}
          customers={customers}
          // TODO: add questions
          questions={[]}
        />
      </div>
      <div className="basis-[40%]">
        <Campaigns
          campaigns={campaigns}
        />
      </div>
    </div>
  )
}