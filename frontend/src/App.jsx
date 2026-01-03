import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login as entry point */}
        <Route path="/" element={<Login />} />

        {/* Main app routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<Project />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


