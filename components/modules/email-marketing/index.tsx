import { getCustomers, getDomains } from "@/actions/domains";
import Campaigns from "./campaigns";
import Customers from "./customers";
import { getAllFilterQuestions } from "@/actions/questions";
import { getCampaigns } from "@/actions/campaigns";

export default async function EmailMarketingLayout() {
  const domains = await getDomains();
  const customers = await getCustomers();
  const questions = await getAllFilterQuestions();
  const campaigns = await getCampaigns();

  return (
    <div className="w-full h-full p-7 flex gap-10">
      <div className="flex-1">
        <Customers
          domains={domains}
          customers={customers}
          questions={questions}
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