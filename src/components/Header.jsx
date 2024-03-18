import { Filters } from "./Filters.jsx";

export function Header({ changefilters }) {
  return (
    <header>
      <h1>React Shop 🛒</h1>
      <Filters changefilters={changefilters} />
    </header>
  );
}
