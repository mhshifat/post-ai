"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import EditEmailForm from "./edit-email-form";

export default function EditEmailBtnWrapper() {
  const { openDialog } = useDialog();

  return (
    <Button variant='link' onClick={() => openDialog({
      title: "Edit Email Content",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, corporis?",
      content: <EditEmailForm onSubmit={() => {}} />
    })}>Edit Email</Button>
  )
}