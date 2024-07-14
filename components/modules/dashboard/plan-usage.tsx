export default function PlanUsage() {
  return (
    <div className="flex flex-col">
      <div>
        <h3 className="text-base font-semibold">Plan Usage</h3>
        <p className="text-sm font-semibold text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis?</p>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h3 className="text-base font-semibold">Credits</h3>
        <p className="flex items-center gap-5 justify-between m-0 text-base font-semibold">
          <span>500</span>
          <span>500</span>
        </p>

        <div className="bg-slate-300 rounded-2xl overflow-hidden h-5">
          <span className="flex items-center justify-center h-full rounded-xl bg-slate-900 w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h3 className="text-base font-semibold">Domains</h3>
        <p className="flex items-center gap-5 justify-between m-0 text-base font-semibold">
          <span>500</span>
          <span>500</span>
        </p>

        <div className="bg-slate-300 rounded-2xl overflow-hidden h-5">
          <span className="flex items-center justify-center h-full rounded-xl bg-slate-900 w-20" />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h3 className="text-base font-semibold">Contacts</h3>
        <p className="flex items-center gap-5 justify-between m-0 text-base font-semibold">
          <span>500</span>
          <span>500</span>
        </p>

        <div className="bg-slate-300 rounded-2xl overflow-hidden h-5">
          <span className="flex items-center justify-center h-full rounded-xl bg-slate-900 w-20" />
        </div>
      </div>
    </div>
  )
}