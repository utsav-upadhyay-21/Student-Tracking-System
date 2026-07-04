import { useState, useEffect } from "react";
import api from "../services/api";
import Loading from "../components/Loading";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.get("/calendar");
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="manage-page">
      <h1>Placement Calendar</h1>
      <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>
        Upcoming company visits and important dates
      </p>

      {error && <p className="error-msg">{error}</p>}

      <div className="manage-list">
        {events.length === 0 ? (
          <p className="empty-msg">No upcoming events.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Visit Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="calendar-row"
                  onClick={() => setSelectedEvent(event)}
                >
                  <td>{event.company_name}</td>
                  <td>
                    {new Date(event.visit_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{event.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedEvent(null)}
            >
              &times;
            </button>
            <h2>{selectedEvent.company_name}</h2>
            <p className="modal-date">
              {new Date(selectedEvent.visit_date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            {selectedEvent.description && (
              <p className="modal-desc">{selectedEvent.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
