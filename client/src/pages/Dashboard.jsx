import { Link, Navigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Manage the placement portal</p>

      <div className="dashboard-grid">
        <Link to="/dashboard/jobs" className="dashboard-card">
          <div className="dashboard-icon">💼</div>
          <h2>Manage Jobs</h2>
          <p>Add, edit, or delete job postings</p>
        </Link>

        <Link to="/dashboard/calendar" className="dashboard-card">
          <div className="dashboard-icon">📅</div>
          <h2>Manage Calendar</h2>
          <p>Add, edit, or delete calendar events</p>
        </Link>

        <Link to="/dashboard/students" className="dashboard-card">
          <div className="dashboard-icon">🎓</div>
          <h2>Manage Students</h2>
          <p>Search and update student details</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
