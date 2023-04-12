import { Dispatch, SetStateAction } from "react";

type Props = {
  searchValue: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function SearchContact({ searchValue, setSearch }: Props) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex items-center gap-2"
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
        className="rounded border border-neutral-400 bg-transparent p-2 text-neutral-900 transition-colors duration-300 placeholder:text-neutral-400 hover:border-neutral-600 focus:border-neutral-600 focus:outline-none dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-500 dark:focus:border-neutral-500"
      />
    </form>
  );
}
