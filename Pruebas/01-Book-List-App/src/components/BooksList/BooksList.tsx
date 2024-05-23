import { type Book } from "../../types";

interface Props {
  books: Book[];
}

export function BooksList({ books }: Readonly<Props>) {
  return (
    <ul className="books">
      {books?.map((book) => {
        const { cover, title, author, id, pages } = book;
        return (
          <li key={id}>
            <h3>{title}</h3>
            <img src={cover} alt={title} />
            <p>{author.name}</p>
            <p>{`N°: ${pages}`}</p>
          </li>
        );
      })}
    </ul>
  );
}
