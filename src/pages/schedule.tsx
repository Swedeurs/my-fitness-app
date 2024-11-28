import { useState } from "react";
import { useUser } from "@/hooks/use-user"; 
import { useRouter } from "next/router"; 
import { format } from "date-fns";
const SchedulePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [schedule, setSchedule] = useState<any[]>([
    {
      sessionName: "Strength Training",
      date: new Date("2024-11-29T14:45:00"),
      description: "Focus on building strength with compound lifts.",
      trainer: "Leo Swedérus",
      trainerPresent: true,
    },
    {
      sessionName: "Cardio Training",
      date: new Date("2024-12-02T10:00:00"), 
      description: "Improving stamina with interval running.",
      trainer: "Leo Swedérus",
      trainerPresent: true,
    },
    {
      sessionName: "Yoga Session",
      date: new Date("2024-12-05T18:30:00"),
      description: "Relax and stretch your muscles for flexibility.",
      trainer: "Leo Swedérus",
      trainerPresent: false,
    },
    {
      sessionName: "HIIT",
      date: new Date("2024-12-08T12:00:00"), 
      description: "High-intensity interval training for fat burning.",
      trainer: "Leo Swedérus",
      trainerPresent: true,
    },
    {
      sessionName: "Pilates",
      date: new Date("2024-12-11T17:30:00"), 
      description: "Strengthen your core with pilates exercises.",
      trainer: "Leo Swedérus",
      trainerPresent: true,
    },
    {
      sessionName: "Cycling Class",
      date: new Date("2024-12-14T08:00:00"),
      description: "Endurance cycling session to boost leg strength.",
      trainer: "Leo Swedérus",
      trainerPresent: false,
    },
  ]); 
  const [showCancelPopup, setShowCancelPopup] = useState(false); 
  const [sessionToCancel, setSessionToCancel] = useState<any | null>(null);

  const formatScheduleDate = (date: Date) => {
    return format(date, "EEEE, MMMM dd 'at' HH:mm");
  };

 
  const handleBackToDashboard = () => {
    router.push(`/dashboard/${user?.id}`);
  };

 
  const handleCancelSession = (session: any) => {
    setSessionToCancel(session);
    setShowCancelPopup(true);
  };

  
  const confirmCancel = () => {
    if (sessionToCancel) {
      
      setSchedule((prevSchedule) =>
        prevSchedule.filter((session) => session !== sessionToCancel)
      );
    }
    setShowCancelPopup(false); 
  };


  const closeCancelPopup = () => {
    setShowCancelPopup(false); 
    setSessionToCancel(null);
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#1a1a1a",
        color: "#e0e0e0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >

      <button
        onClick={handleBackToDashboard}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          padding: "1rem 2rem",
          backgroundColor: "#00ff66",
          color: "#fff",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1.1rem",
          zIndex: 10,
        }}
      >
        Back to Dashboard
      </button>

      <h2
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#00ff66",
        }}
      >
        My Schedule
      </h2>

      <div style={{ maxWidth: "800px", width: "100%" }}>
        {schedule.length === 0 ? (
          <p>No upcoming sessions found.</p>
        ) : (
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: "0",
            }}
          >
            {schedule.map((session, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#333333",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  {session.sessionName}
                </div>
                <p style={{ fontSize: "1rem", marginBottom: "1rem", color: "#ddd" }}>
                  {session.description}
                </p>
                <div style={{ fontSize: "1rem", color: "#aaa" }}>
                  {formatScheduleDate(session.date)}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    marginTop: "1rem",
                    color: "#eee",
                    fontWeight: "bold",
                  }}
                >
                  Trainer: {session.trainer}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    marginTop: "0.5rem",
                    color: session.trainerPresent ? "#4CAF50" : "#FF5722",
                  }}
                >
                  {session.trainerPresent ? "Trainer will be present" : "Trainer not present"}
                </div>

               
                {session.trainerPresent && (
                  <button
                    onClick={() => handleCancelSession(session)}
                    style={{
                      backgroundColor: "#FF5722",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "8px",
                      border: "none",
                      marginTop: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Cancel Session
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>


      {showCancelPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#333",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <h3>Remember</h3>
            <p>
              Canceling 24 hours before the training session will still make you
              pay the personal trainer cost. Are you sure you want to cancel this
              session?
            </p>
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={confirmCancel}
                style={{
                  backgroundColor: "#00ff66",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "1rem",
                }}
              >
                Yes, Cancel
              </button>
              <button
                onClick={closeCancelPopup}
                style={{
                  backgroundColor: "#FF5722",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                No, Keep Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
