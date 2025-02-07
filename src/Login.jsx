import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a successful login
    setIsLoggedIn(true);
    navigate("/dashboard"); // Redirect to the dashboard
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
