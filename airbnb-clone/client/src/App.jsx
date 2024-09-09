import "./App.css";

import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./UserContext.jsx";
import Layout from "./Layout.jsx";

import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";

axios.defaults.baseURL = "http://127.0.0.1:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
