import { useBot } from "@/components/providers/bot-provider";
import Avatar from "@/components/ui/avatar";

export default function MessengerHeader() {
  const { domainDetails, isLive } = useBot();

  return (
    <div className="py-2 px-3 border-b border-border flex items-center gap-2">
      <Avatar
        size={50}
        src={domainDetails?.logo}
      />

      <div className="flex flex-col gap-0">
        <h3 className="text-lg font-medium m-0 leading-tight text-foreground capitalize">{domainDetails?.domain?.split(".")[0]}</h3>
        <p className="text-sm text-foreground/50 m-0 leading-tight flex items-center gap-2">
          <span>{domainDetails?.domain}</span>
          {isLive && (
            <>
              <span className="w-2 h-2 rounded-full bg-primary flex" />
              <span className="text-sm font-semibold text-primary">Live</span>
            </>
          )}
        </p>
      </div>

      {/* <div className="flex items-center ml-auto">
        <Avatar className="cursor-pointer relative -left-[0px]" />
        <Avatar className="cursor-pointer relative -left-[5px]" />
        <Avatar className="cursor-pointer relative -left-[10px]" />
      </div> */}
    </div>
  )
}