import "./App.css";
import { useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { UsersList } from "./components/UsersList";
import { SortBy, type User } from "./types.d";

const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=oigomezz&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la peticion");
      return await res.json();
    })
    .then((res) => {
      const nextCursor = Number(res.info.page) + 1;
      return {
        users: res.results,
        nextCursor,
      };
    });
};

function App() {
  const { isLoading, isError, data, refetch, fetchNextPage } =
    useInfiniteQuery<{
      nextCursor?: number;
      users: User[];
    }>({
      queryKey: ["users"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => await fetchUsers({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? [];
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  
  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email);
    // setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleReset = async () => {
    await refetch();
  };

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="app">
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear files</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input
          placeholder="Filtra por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && (
          <button onClick={() => fetchNextPage()}>
            Cargar mas resultados...
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
