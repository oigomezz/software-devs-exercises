import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

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
          <Route path="/" element={<h1> Dashboard </h1>} />
          <Route path="/auth" element={<h1> Sing In </h1>} />
        </Routes>
      </div>
    </Router>
  );
}
