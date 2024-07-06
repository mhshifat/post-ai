"use client";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import Steps from "@/components/ui/steps";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AppointmentBookingForm() {
  const triggerRef = useRef<{ handleStep: () => void; }>({
    handleStep: () => {}
  });
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(values: unknown) {
    setLoading(true);
    try {
      // TODO:
      triggerRef.current.handleStep();
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage || (err as Error)?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DatePicker
        enableTimePicker
      />

      <Steps.Trigger ref={triggerRef} type="next" />
      <div className="flex items-center gap-5">
        <Steps.Trigger type="prev" asChild>
          <Button type="button" variant="outline" className="flex-1">
            Previous
          </Button>
        </Steps.Trigger>
        <Button disabled={loading} type="submit" className="flex-1">
          {loading ? "Loading..." : "Continue"}
        </Button>
      </div>
    </form>
  )
}