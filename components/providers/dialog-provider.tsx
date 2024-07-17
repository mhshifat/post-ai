"use client";

import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Divider from "../ui/divider";
import { cn } from "@/lib/utils";

interface DialogState {
  position?: "left" | "right";
  title?: string;
  description?: string;
  content: ReactElement;
}

interface DialogCtxState {
  openDialog: (params: DialogState) => void;
  closeDialog: () => void;
}

const DialogCtx = createContext<DialogCtxState | null>(null)

export default function DialogProvider({ children }: PropsWithChildren) {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const openDialog = useCallback((params: DialogState) => {
    setDialogState(params);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState(null);
  }, []);

  return (
    <DialogCtx.Provider value={{
      openDialog,
      closeDialog
    }}>
      {children}

      <Dialog
        open={dialogState !== null}
        onOpenChange={closeDialog}
      >
        <DialogContent
          className={cn("", {
            "top-0 right-0 left-[auto] translate-x-0 translate-y-0 h-screen flex flex-col": dialogState?.position === 'right'
          })}
        >
          {(dialogState?.title || dialogState?.description) && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground">{dialogState?.title}</DialogTitle>
                <DialogDescription className="text-foreground/50">{dialogState?.description}</DialogDescription>
              </DialogHeader>
              <Divider className="h-[1px]" />
            </>
          )}
          <div className="flex flex-col gap-4 py-4">
            {dialogState?.content}
          </div>
        </DialogContent>
      </Dialog>
    </DialogCtx.Provider>
  )
}

export function useDialog() {
  const res = useContext(DialogCtx);
  if (!res) throw new Error("Component needs to be wrapped with `DialogProvider`")
  return res;
}