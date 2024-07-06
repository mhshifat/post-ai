import Avatar from "@/components/ui/avatar"
import Divider from "@/components/ui/divider"

export default function TodaysAppointments() {
  return (
    <div className="w-full flex flex-col gap-0 rounded-xl overflow-hidden">
      <div className="grid grid-cols-[20%_1fr] overflow-hidden">
        <div className="w-full p-3 bg-[#007DFC] flex justify-center items-center text-white font-semibold text-lg">4:30 PM</div>
        <div className="flex flex-col">
          <div className="flex-1 flex items-center justify-between p-3">
            <span className="text-base text-slate-900 font-medium"><small className="text-sm text-slate-500">Created</small><br/>18:23PM</span>
            <span className="text-base text-slate-900 font-medium"><small className="text-sm text-slate-500">Domain</small><br/>domain.com</span>
          </div>
          <Divider />
          <div className="border-b border-slate-200 flex-1 flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Avatar />
              <span className="text-sm text-slate-900">domain@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[20%_1fr] overflow-hidden">
        <div className="w-full p-3 bg-[#007DFC] flex justify-center items-center text-white font-semibold text-lg">4:30 PM</div>
        <div className="flex flex-col">
          <div className="flex-1 flex items-center justify-between p-3">
            <span className="text-base text-slate-900 font-medium"><small className="text-sm text-slate-500">Created</small><br/>18:23PM</span>
            <span className="text-base text-slate-900 font-medium"><small className="text-sm text-slate-500">Domain</small><br/>domain.com</span>
          </div>
          <Divider />
          <div className="border-b border-slate-200 flex-1 flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Avatar />
              <span className="text-sm text-slate-900">domain@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}