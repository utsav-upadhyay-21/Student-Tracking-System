import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>RVITM Campus Placement Application</h1>
        <p>Department of Information Science</p>
      </section>

      <section className="feature-cards">
        <Link to="/calendar" className="feature-card calendar-feature">
          <div className="feature-icon">📅</div>
          <h2>Placement Calendar</h2>
          <p>View upcoming company visits and important dates</p>
        </Link>

        <Link to="/jobs" className="feature-card jobs-feature">
          <div className="feature-icon">💼</div>
          <h2>Available Jobs</h2>
          <p>Browse active placement opportunities</p>
        </Link>

        <Link to="/student" className="feature-card student-feature">
          <div className="feature-icon">🎓</div>
          <h2>Student Details</h2>
          <p>Check your placement eligibility</p>
        </Link>
      </section>
    </div>
  );
}

export default Home;
