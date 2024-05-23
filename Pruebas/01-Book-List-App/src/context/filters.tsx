import { createContext, useMemo, useState } from "react";

interface FilterContextType {
  filters: {
    genre: string;
    minPage: number;
    sort: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      genre: string;
      minPage: number;
      sort: boolean;
    }>
  >;
}

export const FiltersContext = createContext<FilterContextType>(null!);

export function FiltersProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [filters, setFilters] = useState({
    genre: "All",
    minPage: 0,
    sort: false
  });

  const value = useMemo(() => ({ filters, setFilters }), [filters]);

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}
