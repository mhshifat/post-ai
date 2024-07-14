interface DashboardCardProps {
  icon: JSX.Element;
  title: string;
  content: string;
}

export default function DashboardCard({
  content,
  title,
  icon,
}: DashboardCardProps) {
  return (
    <div className="w-full border border-slate-200 px-8 py-6 rounded-sm bg-slate-50 flex flex-col gap-3">
      <div className="w-full flex items-center gap-2 text-xl font-semibold">
        {icon} {title}
      </div>

      <div className="text-3xl font-semibold text-slate-900">
        {content}
      </div>
    </div>
  )
}