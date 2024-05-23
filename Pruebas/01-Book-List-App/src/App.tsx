import "./App.css";

import { useBooks } from "./hooks/useBook";
import { useSearch } from "./hooks/useSearch";

import { BooksList } from "./components/BooksList/BooksList";

function App() {
  const { search, setSearch, error } = useSearch();
  const { books, loading, sort, setSort, getBooks } = useBooks({ search });

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getBooks({ search });
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const newSearch = inputElement.value;
    setSearch(newSearch);
    // debounce
  };

  return (
    <div className="page">
      <header>
        <h1>Book List App</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <input
              style={{
                border: "1px solid transparent",
                borderColor: error ? "red" : "transparent",
              }}
              name="query"
              value={search}
              onChange={handleChange}
              placeholder="Search for a book..."
            />
            <button type="submit">Buscar</button>
          </div>
          <div className="row">
            <label>
              <input type="checkbox" onChange={handleSort} checked={sort} />
              Ordenar alfabeticamente
            </label>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <BooksList books={books} />}</main>
    </div>
  );
}

export default App;
