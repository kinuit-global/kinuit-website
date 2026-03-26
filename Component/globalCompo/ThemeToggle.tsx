"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const themes = [
    { name: "light", icon: <Sun size={16} />, label: "Light" },
    { name: "dark", icon: <Moon size={16} />, label: "Dark" },
    { name: "system", icon: <Monitor size={16} />, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 bg-k-glass-bg border border-k-glass-border p-1 rounded-full backdrop-blur-md">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          className={`
            relative p-2 rounded-full transition-all duration-300
            ${theme === t.name
              ? "text-k-primary"
              : "text-k-text-muted hover:text-k-text"
            }
          `}
          title={t.label}
        >
          {theme === t.name && (
            <motion.span
              layoutId="active-theme"
              className="absolute inset-0 bg-k-primary/10 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{t.icon}</span>
        </button>
      ))}
    </div>
  );
}
