import "./App.css";
import { library } from "../books.json";
import { type Library } from "./types.d";

import { BooksList } from "./components/BooksList/BooksList";

function App() {
  const books: Library[] = [...library];
  return (
    <div className="page">
      <h1>Book List App</h1>
      <main>
        <BooksList books={books} />
      </main>
    </div>
  );
}

export default App;
