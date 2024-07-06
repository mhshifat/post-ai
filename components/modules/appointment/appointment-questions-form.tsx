"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Steps from "@/components/ui/steps";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AppointmentQuestionsForm() {
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
      <div>
        <Label>Answer</Label>
        <Input />
      </div>

      <Steps.Trigger ref={triggerRef} type="next" />
      <Button disabled={loading} type="submit" className="w-full">
        {loading ? "Loading..." : "Continue"}
      </Button>
    </form>
  )
}