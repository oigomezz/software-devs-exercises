import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar un libro vacio");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 carateres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
