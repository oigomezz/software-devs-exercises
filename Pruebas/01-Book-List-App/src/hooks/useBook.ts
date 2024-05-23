import { type Book } from "../types";
import { useCallback, useMemo, useRef, useState } from "react";
import { searchBooks } from "../services/books";

export function useBooks({ search, sort }: { search: string; sort: boolean }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousSearch = useRef(search);

  const getBooks = useCallback(({ search }: { search: string }) => {
    if (search === "") return;
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newBooks = searchBooks({ search });
      setBooks(newBooks);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedBooks = useMemo(() => {
    if (!books) return;
    return sort
      ? [...books].sort((a, b) => a.title.localeCompare(b.title))
      : books;
  }, [sort, books]);

  return { books: sortedBooks, getBooks, loading, error };
}
