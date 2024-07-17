import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, User2Icon } from "lucide-react";
import EditEmailBtnWrapper from "./edit-email-btn-wrapper";

export default function Campaigns() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="size-4" />

          <span>Add to Campaign</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Plus className="size-4" />

          <span>Create Campaign</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <span>10 Credits</span>
        </Button>
      </div>

      <div className="w-full pt-5">
        <div className="border border-border rounded-sm px-3 py-2 cursor-pointer">
          <div className="flex items-center gap-5 justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-foreground/50" />
              <span className="text-sm font-normal text-foreground/50">Created Apr 25th</span>
            </div>
            <div className="flex items-center gap-2">
              <User2Icon className="size-4 text-foreground/50" />
              <span className="text-sm font-normal text-foreground/50">0 Customers Added</span>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <h3  className="text-2xl font-semibold text-foreground">Lead Generation</h3>
            
            <div className="flex items-center gap-2 ml-auto">
              <EditEmailBtnWrapper />
              <Button variant="outline" size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}