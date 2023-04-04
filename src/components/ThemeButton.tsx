import { SunIcon } from "@heroicons/react/24/outline";

export default function ThemeButton() {
  function handleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <button
      onClick={handleTheme}
      type="button"
      className="w-fit rounded border border-neutral-300 p-2 dark:border-neutral-700"
    >
      <SunIcon className="h-6 w-6" />
    </button>
  );
}
