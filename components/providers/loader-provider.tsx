"use client";
import { createContext, PropsWithChildren, useContext } from "react"

interface LoaderProviderProps {}

interface LoaderCtxProps extends LoaderProviderProps {}

const LoaderCtx = createContext<LoaderCtxProps | null>(null);

export default function LoaderProvider({ children }: PropsWithChildren<LoaderProviderProps>) {
  return (
    <LoaderCtx.Provider value={{
    }}>
      {children}
    </LoaderCtx.Provider>
  )
}

export function useLoader() {
  const res = useContext(LoaderCtx);
  if (!res) throw new Error("Component needs to wrapped with LoaderProvider");
  return res;
}