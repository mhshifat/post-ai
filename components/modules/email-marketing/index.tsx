"use client";

import Campaigns from "./campaigns";
import Customers from "./customers";

export default function EmailMarketingLayout() {
  return (
    <div className="w-full h-full p-7 flex gap-10">
      <div className="flex-1">
        <Customers />
      </div>
      <div className="basis-[40%]">
        <Campaigns />
      </div>
    </div>
  )
}