import { useContext } from "react";
import { FiltersContext } from "../context/filters";
import { Book } from "../types";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterBooks = (books: Book[]) => {
    return books.filter((book) => {
      return (
        book.pages >= filters.minPage &&
        (filters.genre === "All" || book.genre === filters.genre)
      );
    });
  };

  return { filters, filterBooks, setFilters };
}
