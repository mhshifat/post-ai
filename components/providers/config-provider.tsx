"use client";

import { createContext, PropsWithChildren, useContext } from "react"

interface ConfigProviderProps {
  envs: {
    TEST_MODE: boolean | undefined;
  }
}

interface ConfigCtxProps extends ConfigProviderProps {}

const ConfigCtx = createContext<ConfigCtxProps | null>(null);

export default function ConfigProvider({ children, envs }: PropsWithChildren<ConfigProviderProps>) {
  return (
    <ConfigCtx.Provider value={{
      envs
    }}>
      {children}
    </ConfigCtx.Provider>
  )
}

export function useConfig() {
  const res = useContext(ConfigCtx);
  if (!res) throw new Error("Component needs to wrapped with ConfigProvider");
  return res;
}