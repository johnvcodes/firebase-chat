import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction } from "react";

type Props = {
  searchValue: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function SearchContact({ searchValue, setSearch }: Props) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex items-center rounded border border-neutral-400 bg-transparent text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 focus-within:border-neutral-600 focus-within:outline-none hover:border-neutral-600 dark:border-neutral-700 dark:text-neutral-50 dark:focus-within:border-neutral-500 dark:hover:border-neutral-500"
    >
      <label htmlFor="search-contact" className="sr-only">
        Buscar contato
      </label>
      <input
        onChange={(event) => setSearch(event.target.value)}
        value={searchValue}
        type="text"
        name="searchContact"
        id="search-contact"
        placeholder="Buscar contato"
        className="bg-transparent px-2 py-1 text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 focus:outline-none  dark:text-neutral-50"
      />
      <span className="px-2 py-1">
        <MagnifyingGlassIcon className="h-6 w-6" />
      </span>
    </form>
  );
}
