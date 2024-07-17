"use client";

import { IThemes } from '@/utils/types';
import { useState, useEffect, useCallback } from 'react';

export default function useSystemTheme() {
  const getSystemTheme = useCallback((): IThemes => {
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT';
  }, []);

  const [theme, setTheme] = useState<IThemes>(getSystemTheme());

  useEffect(() => {
    const theme = localStorage.getItem("APP_THEME");
    if (theme) return setTheme(theme as IThemes);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = () => {
      setTheme(mediaQuery.matches ? 'DARK' : 'LIGHT');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return {
    theme,
    refetch: getSystemTheme
  };
};