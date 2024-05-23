export interface Library {
  book: BookAPI;
}
export interface Book {
  id: string;
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  author: Author;
}
export interface BookAPI {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Author;
}

export interface Author {
  name: string;
  otherBooks: string[];
}
