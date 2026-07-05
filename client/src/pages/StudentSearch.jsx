import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

function StudentSearch() {
  const [usn, setUsn] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!usn.trim()) {
      setError("Please enter a USN");
      return;
    }

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const data = await api.get(`/students/${usn.trim().toUpperCase()}`);
      setStudent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-page student-search">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>

      <h1>Verify Your Details</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter USN (e.g., 1RF23IS090)"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      {loading && <Loading />}
      {error && <p className="error-msg">{error}</p>}

      {student && (
        <>
          <div className="student-profile-header">
            <h2>{student.student_name}</h2>
            <span className="student-usn-badge">{student.usn}</span>
          </div>

          <div className="manage-list">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>USN</td>
                  <td>{student.usn}</td>
                </tr>
                <tr>
                  <td>Student Name</td>
                  <td>{student.student_name}</td>
                </tr>
                <tr>
                  <td>College Email</td>
                  <td>{student.college_email || "N/A"}</td>
                </tr>
                <tr>
                  <td>Personal Email</td>
                  <td>{student.personal_email || "N/A"}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{student.phone_number}</td>
                </tr>
                <tr>
                  <td>10th Marks</td>
                  <td>{student.tenth_marks}%</td>
                </tr>
                <tr>
                  <td>12th Marks</td>
                  <td>{student.twelfth_marks}%</td>
                </tr>
                <tr>
                  <td>CGPA</td>
                  <td className="cgpa-cell">{student.cgpa}</td>
                </tr>
                <tr>
                  <td>Active Backlogs</td>
                  <td>{student.active_backlogs}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="sem-section-title">Semester GPAs</h3>
          <div className="manage-list">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>GPA</th>
                </tr>
              </thead>
              <tbody>
                {student.sem1 && (
                  <tr>
                    <td>Semester 1</td>
                    <td>{student.sem1}</td>
                  </tr>
                )}
                {student.sem2 && (
                  <tr>
                    <td>Semester 2</td>
                    <td>{student.sem2}</td>
                  </tr>
                )}
                {student.sem3 && (
                  <tr>
                    <td>Semester 3</td>
                    <td>{student.sem3}</td>
                  </tr>
                )}
                {student.sem4 && (
                  <tr>
                    <td>Semester 4</td>
                    <td>{student.sem4}</td>
                  </tr>
                )}
                {student.sem5 && (
                  <tr>
                    <td>Semester 5</td>
                    <td>{student.sem5}</td>
                  </tr>
                )}
                {student.sem6 && (
                  <tr>
                    <td>Semester 6</td>
                    <td>{student.sem6}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentSearch;
