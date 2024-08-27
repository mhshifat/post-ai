import NotFound from "@/components/shared/not-found"
import Avatar from "@/components/ui/avatar"
import Divider from "@/components/ui/divider"
import { formatISODate } from "@/utils/date"
import { IAppointmentWithDomain } from "@/utils/types"

export default function TodaysAppointments({ appointments }: { appointments: IAppointmentWithDomain }) {
  return (
    <div className="w-full flex flex-col gap-0 rounded-xl overflow-hidden">
      {appointments.map((item) => (
        <div key={item.id} className="grid grid-cols-[20%_1fr] overflow-hidden">
          <div className="w-full p-3 bg-primary flex justify-center items-center text-background font-semibold text-lg">{item.time}</div>
          <div className="flex flex-col">
            <div className="flex-1 flex items-center justify-between p-3">
              <span className="text-base text-foreground font-medium"><small className="text-sm text-foreground/50">Created</small><br/>{formatISODate(item.createdAt)}</span>
              <span className="text-base text-foreground font-medium"><small className="text-sm text-foreground/50">Domain</small><br/>{item.domain?.domain}</span>
            </div>
            <Divider />
            <div className="border-b border-border flex-1 flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <Avatar size={30} />
                <span className="text-sm text-foreground">{item.customer?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={item.link!} target="__blank" className="text-sm text-primary underline">{item.link}</a>
              </div>
            </div>
          </div>
        </div>
      ))}
      {!appointments.length && <NotFound />}
    </div>
  )
}