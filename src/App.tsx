import "./App.css";
import { useState, useEffect } from "react";

import type { User } from "./types";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
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
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  );
}

export default App;
