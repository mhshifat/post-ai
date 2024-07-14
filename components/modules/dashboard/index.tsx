import { CalendarDays, DollarSign, UserCheck } from "lucide-react";
import DashboardCard from "./dashboard-card";
import PlanUsage from "./plan-usage";
import RecentTransactions from "./recent-transactions";

export default function DashboardPageLayout() {
  return (
    <div className="w-full py-2 px-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-4 auto-rows-fr gap-5">
        <DashboardCard
          icon={<UserCheck className="size-5" />}
          title="Potential Clients"
          content="7"
        />
        <DashboardCard
          icon={<DollarSign className="size-5" />}
          title="Pipeline Value"
          content="$539"
        />
        <DashboardCard
          icon={<CalendarDays className="size-5" />}
          title="Appointments"
          content="5"
        />
        <DashboardCard
          icon={<DollarSign className="size-5" />}
          title="Total Sale"
          content="$77.74"
        />
      </div>

      <div className="mt-10 gap-5 grid grid-cols-1 md:grid-cols-2 auto-rows-fr">
        <PlanUsage />
        <RecentTransactions />
      </div>
    </div>
  )
}