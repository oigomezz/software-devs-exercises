import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}
