"use client";

import { IThemes } from "@/utils/types";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react"
import useSystemTheme from "../hooks/use-system-theme";

interface ThemeProviderProps {
}

interface ThemeCtxProps extends ThemeProviderProps {
  currentTheme: IThemes;
  changeTheme: (value: IThemes) => void;
}

const ThemeCtx = createContext<ThemeCtxProps | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren<ThemeProviderProps>) {
  const { theme: systemTheme, refetch } = useSystemTheme();
  const [currentTheme, setCurrentTheme] = useState<IThemes>(systemTheme);

  const changeTheme = useCallback((value: IThemes) => {
    let newVal = value;
    localStorage.setItem("APP_THEME", newVal);
    if (newVal === "SYSTEM") {
      localStorage.removeItem("APP_THEME");
      newVal = refetch();
      setCurrentTheme("SYSTEM");
    } else {
      setCurrentTheme(newVal);
    }
    if (newVal === "DARK") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("APP_THEME");
    changeTheme(theme ? theme as IThemes : "SYSTEM");
  }, [])

  return (
    <ThemeCtx.Provider value={{
      currentTheme,
      changeTheme
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