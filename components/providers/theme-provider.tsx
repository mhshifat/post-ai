"use client";

import { IThemes } from "@/utils/types";
import { createContext, PropsWithChildren, useContext, useState } from "react"

interface ThemeProviderProps {
}

interface ThemeCtxProps extends ThemeProviderProps {
  currentTheme: IThemes;
}

const ThemeCtx = createContext<ThemeCtxProps | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren<ThemeProviderProps>) {
  const [currentTheme, setCurrentTheme] = useState<IThemes>("LIGHT");

  return (
    <ThemeCtx.Provider value={{
      currentTheme
    }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export function useTheme() {
  const res = useContext(ThemeCtx);
  if (!res) throw new Error("Component needs to wrapped with ThemeProvider");
  return res;
}