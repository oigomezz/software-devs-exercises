import "./App.css";
import { useState, useEffect, useRef } from "react";

import { type User } from "./types.d";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="app">
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear files</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
