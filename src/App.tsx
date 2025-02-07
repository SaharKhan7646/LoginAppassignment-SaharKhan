import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login"; // Login page
import Dashboard from "./Dashboard"; // Home/Dashboard page
import CrudPage from "./CrudPage"; // CRUD operations page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state

  // PrivateRoute component for route protection
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root ("/") to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route for Login */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Protected Route for CRUD Page */}
        <Route
          path="/crud"
          element={
            <PrivateRoute>
              <CrudPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
