import { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface DialogState {
  title: string;
  description: string;
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogState?.title}</DialogTitle>
            <DialogDescription>{dialogState?.description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4 border-t border-slate-200">
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