"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ scrolled }: { scrolled: boolean }) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const currentTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);

    }, []);

    if (!mounted) return null; 


    return (
        <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className={`p-2 hover:cursor-pointer rounded-full ${scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-white hover:bg-white/20"
                }`}
        >
            {currentTheme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
}
