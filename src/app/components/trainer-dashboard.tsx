import { useEffect, useState } from "react";

export default function TrainerDashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch sessions
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const handleAddSession = async () => {
    // Logic to add a new session
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trainerId: 1, sessionTime: new Date() }),
    });
    // Refresh the sessions list
    fetch("/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  };

  return (
    <div>
      <h2>Manage Sessions</h2>
      <button onClick={handleAddSession}>Add New Session</button>
      <ul>
        {sessions.map((session) => (
          <li key={session.sessionId}>
            Session at {session.sessionTime} - Status: {session.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
