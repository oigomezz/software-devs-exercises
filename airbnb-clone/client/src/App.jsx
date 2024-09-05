import "./App.css";

import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
    </Routes>
  );
}

export default App;
