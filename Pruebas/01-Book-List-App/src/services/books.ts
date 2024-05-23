import { library } from "../../books.json";
import { type Library } from "../types.d";

export const searchBooks = ({ search }: { search: string }) => {
  const books: Library[] = [...library];
  return books.map((item) => ({
    id: item.book.ISBN,
    title: item.book.title,
    pages: item.book.pages,
    genre: item.book.genre,
    cover: item.book.cover,
    synopsis: item.book.synopsis,
    year: item.book.year,
    author: item.book.author,
  }));
};
