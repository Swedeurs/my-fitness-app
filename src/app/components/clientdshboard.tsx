import { useEffect, useState } from "react";

export default function ClientDashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch sessions
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const handleBookSession = async (sessionId) => {
    await fetch(`/api/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId: 2, status: "booked" }), // Mocked clientId
    });
    // Refresh sessions
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      <ul>
        {sessions
          .filter((session) => session.status === "available")
          .map((session) => (
            <li key={session.sessionId}>
              Session at {session.sessionTime} -{" "}
              <button onClick={() => handleBookSession(session.sessionId)}>
                Book Now
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
