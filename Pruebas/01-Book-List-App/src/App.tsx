import { useEffect, useMemo, useState } from "react";

import { BooksList } from "./components/BooksList/BooksList";
import { Header } from "./components/Header/Header";
import { useFilters } from "./hooks/useFilters";
import { Book, type Library } from "./types";
import { library } from "../books.json";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  const initialBooks: Library[] = [...library];

  useEffect(() => {
    const newBooks: Book[] = initialBooks.map((item) => ({
      id: item.book.ISBN,
      title: item.book.title,
      pages: item.book.pages,
      genre: item.book.genre,
      cover: item.book.cover,
      synopsis: item.book.synopsis,
      year: item.book.year,
      author: item.book.author,
    }));

    setBooks(newBooks);
    setLoading(false);
  }, [loading]);

  const { filters, filterBooks } = useFilters();

  const sortedBooks = useMemo(() => {
    if (!books) return [];
    return filters.sort
      ? [...books].sort((a, b) => a.title.localeCompare(b.title))
      : books;
  }, [filters.sort, books]);

  const filteredBooks: Book[] = sortedBooks ? filterBooks(sortedBooks) : [];

  return (
    <div className="page">
      <Header />
      <main>
        {loading ? <p>Cargando...</p> : <BooksList books={filteredBooks} />}
      </main>
    </div>
  );
}

export default App;
