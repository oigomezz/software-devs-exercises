import "./App.css";

import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./context/UserContext.jsx";
import Layout from "./components/Layout.jsx";

import BookingPage from "./pages/BookingPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";

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
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
