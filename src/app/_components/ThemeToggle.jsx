"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LightModeIcon } from "../_icons/LightModeIcon";
import { DarkModeIcon } from "../_icons/DarkModeIcon";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg  hover:bg-accent transition-colors"
    >
      {theme === "dark" ? <DarkModeIcon/> : <LightModeIcon/>}
    </button>
  );
}