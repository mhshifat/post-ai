"use client";

import { createContext, CSSProperties, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useCallback, useContext, useId, useState } from "react"
import PopupTrigger from "./popup-trigger";
import PopupContent from "./popup-content";

interface PopupProps {
  className?: string;
}

interface PopupCtxProps extends PopupProps {
  setPopupTriggerRef: Dispatch<SetStateAction<HTMLDivElement | null>>;
  setPopupContentRef: Dispatch<SetStateAction<HTMLDivElement | null>>;
  getContentStyles: () => CSSProperties;
  togglePopup: () => void;
}

const PopupCtx = createContext<PopupCtxProps | null>(null);

export default function Popup({ children, className }: PropsWithChildren<PopupProps>) {
  const id = useId();
  const identifier = id;
  const [show, setShow] = useState(false);
  const [popupTriggerRef, setPopupTriggerRef] = useState<HTMLDivElement | null>(null);
  const [popupContentRef, setPopupContentRef] = useState<HTMLDivElement | null>(null);

  const getContentStyles = useCallback(() => {
    const { top = 0, height = 0, width, left } = popupTriggerRef?.getBoundingClientRect() || {};
    
    return {
      position: "fixed",
      top: top + height + 10,
      left: left,
      width: width,
      zIndex: show ? 99 : -10000,
      opacity: show ? 1 : 0,
      pointerEvents: show ? "all" : "none"
    } satisfies CSSProperties;
  }, [popupTriggerRef, show])

  const togglePopup = () => setShow(value => !value);

  return (
    <PopupCtx.Provider value={{
      setPopupTriggerRef,
      setPopupContentRef,
      getContentStyles,
      togglePopup
    }}>
      <div className={className}>
        {children}
      </div>
    </PopupCtx.Provider>
  )
}

Popup.Trigger = PopupTrigger;
Popup.Content = PopupContent;

export function usePopup() {
  const res = useContext(PopupCtx);
  if (!res) throw new Error("Component needs to wrapped with Popup");
  return res;
}