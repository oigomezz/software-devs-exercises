import "./App.css";
import { useState, useEffect } from "react";

import type { User } from "./types";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);

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
    <div>
      <h1>Prueba tecnica</h1>
      <UsersList users={users} />
    </div>
  );
}

export default App;
