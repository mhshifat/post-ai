"use client";

import { createAppointment } from "@/actions/appointments";
import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Form } from "@/components/ui/form";
import Steps from "@/components/ui/steps";
import { IAppointment } from "@/utils/types";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { endOfDay } from 'date-fns';

const formSchema = z.object({
  date: z.string(),
  time: z.string(),
  domainId: z.string(),
  customerId: z.string(),
});

export type AppointmentBookingFormSchema = z.infer<typeof formSchema>;

interface AppointmentBookingFormProps {
  appointments: Partial<IAppointment>[];
  domainId: string, 
  customerId: string
}

export default function AppointmentBookingForm({ customerId, domainId, appointments }: AppointmentBookingFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const form = useForm<AppointmentBookingFormSchema>({
    defaultValues: {
      domainId: domainId,
      customerId: customerId,
      date: "",
      time: ""
    }
  })
  const disabledTimeSlots = useMemo(() => {
    return appointments.reduce<Record<string, string[]>>((acc, appointment) => {
      if (!acc[new Date(appointment.date!).toISOString()]) acc[new Date(appointment.date!).toISOString()] = [appointment.time!];
      else acc[new Date(appointment.date!).toISOString()]?.push(appointment.time!);
      return acc;
    }, {})
  }, [appointments]);
  async function handleSubmit(values: AppointmentBookingFormSchema) {
    setLoading(true);
    try {
      await createAppointment(values);
      toast.success("An appointment has been created, please check your email");
      router.push(`${pathname}?status=success`);
    } catch (err) {
      const message = (err as ClerkAPIResponseError)?.errors?.[0]?.longMessage || (err as Error)?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <DatePicker
          enableTimePicker
          onChange={(date) => form.setValue("date", endOfDay(date).toISOString())}
          onTimeSelect={(time) => form.setValue("time", time)}
          disabledTimeSlots={disabledTimeSlots}
        />

        <div className="flex items-center gap-5">
          <Steps.Trigger type="prev" asChild>
            <Button type="button" variant="outline" className="flex-1">
              Previous
            </Button>
          </Steps.Trigger>
          <Button disabled={loading} type="submit" className="flex-1">
            {loading ? <Spinner /> : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}