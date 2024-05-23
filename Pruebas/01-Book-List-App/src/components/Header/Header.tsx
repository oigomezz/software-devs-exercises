import { useId } from "react";
import { useFilters } from "../../hooks/useFilters";

export function Header() {
  const { filters, setFilters } = useFilters();

  const minPageFilterId = useId();
  const genreFilterId = useId();
  const genres = ["Fantasía", "Ciencia ficción", "Zombies", "Terror"];

  const handleChangeMinPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      minPage: parseInt(event.target.value),
    }));
  };

  const handleChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      genre: event.target.value,
    }));
  };

  const handleSort = () => {
    const { sort } = filters;
    setFilters((prevState) => ({
      ...prevState,
      sort: !sort,
    }));
  };

  const minPage =
    filters.minPage > 100
      ? `N° Pages: 0${filters.minPage}`
      : `N° Pages: 00${filters.minPage}`;

  return (
    <header>
      <h1>Book List App</h1>
      <form className="form">
        <section className="filters">
          <div className="row">
            <label htmlFor={minPageFilterId}>
              <span>
                {filters.minPage > 1000
                  ? `N° Pages: ${filters.minPage}`
                  : minPage}
              </span>
            </label>

            <input
              type="range"
              id={minPageFilterId}
              min="0"
              max="1200"
              onChange={handleChangeMinPage}
              value={filters.minPage}
            />
          </div>
          <div className="row">
            <label htmlFor={genreFilterId}>Genre</label>
            <select id={genreFilterId} onChange={handleChangeGenre}>
              <option value="All"> All </option>
              {genres?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label>
              <input
                type="checkbox"
                onChange={handleSort}
                checked={filters.sort}
              />
              Ordenar alfabeticamente
            </label>
          </div>
        </section>
      </form>
    </header>
  );
}
