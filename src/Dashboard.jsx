import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Link to="/crud">Go to CRUD Operations</Link>
    </div>
  );
}

export default Dashboard;
