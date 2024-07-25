"use client";

import { cloneElement, PropsWithChildren, ReactElement, useState } from "react";
import { useDialog } from "../providers/dialog-provider";
import { toast } from "sonner";
import Confirmation from "./confirmation";
import Spinner from "./spinner";
import { useRouter } from "next/navigation";

interface DeleteHandlerProps {
  title?: string;
  description: string;
  handler: () => Promise<void>
}

export default function DeleteHandler({ children, title, description, handler }: PropsWithChildren<DeleteHandlerProps>) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [loading, setLoading] = useState(false);

  async function handleOk() {
    setLoading(true);
    try {
      await handler();
      router.refresh();
      closeDialog();
      toast.success("Successfully deleted");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return cloneElement(children as ReactElement, {
    onClick: () => openDialog({
      title: title || "Are you sure?",
      description: description,
      content: <Confirmation
        onCancel={closeDialog}
        onOk={handleOk}
      />
    }),
    disabled: loading,
    children: loading ? <Spinner /> : (children as unknown as { props: { children: unknown } })?.props?.children
  })
}