"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateAppointmentForm from "./create-appointment-form";
import { IDomain } from "@/utils/types";

export default function CreateAppointmentBtnWrapper({ domains }: { domains: Partial<IDomain>[] }) {
  const { closeDialog, openDialog } = useDialog();

  return (
    <Button variant="outline" size="sm" className="flex items-center gap-2"
      onClick={() => openDialog({
        title: "Create a new appointment",
        description: "Please fill in the form below to create a new appointment",
        content: <CreateAppointmentForm
          onComplete={closeDialog}
          domains={domains}
        />
      })}
    >
      {/* TODO: Add Customer Support for an appointment and possibly add google meet support */}
      <Plus className="size-4" />

      <span>Create Appointment</span>
    </Button>
  )
}