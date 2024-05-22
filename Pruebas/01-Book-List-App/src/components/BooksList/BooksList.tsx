import { type Library } from "../../types";

interface Props {
  books: Library[];
}

export function BooksList({ books }: Readonly<Props>) {
  return (
    <ul className="books">
      {books.map((item) => {
        const { book } = item;
        const { cover, title, author, ISBN } = book;
        const id = ISBN;
        return (
          <li key={id}>
            <img src={cover} alt={title} />
            <div>
              <strong>{title}</strong> - {author.name}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
