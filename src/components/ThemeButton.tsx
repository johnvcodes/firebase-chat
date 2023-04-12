import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeButton() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  function handleTheme() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode === true) {
      localStorage.setItem("theme", "dark");
      return document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", "light");
    return document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <button
      onClick={handleTheme}
      type="button"
      className="rounded p-1 transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 " />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}
