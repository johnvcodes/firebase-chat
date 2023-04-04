import { Dispatch, SetStateAction } from "react";

type Props = {
  searchValue: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export default function SearchContact({ searchValue, setSearch }: Props) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex items-center gap-2 rounded border border-neutral-300 dark:border-neutral-700"
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
        className="bg-transparent p-2"
      />
    </form>
  );
}
