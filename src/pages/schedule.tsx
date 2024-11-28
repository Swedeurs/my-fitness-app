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
      trainerPresent: false,
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
      trainer: "No Trainer",
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
      trainer: "No Trainer",
      trainerPresent: false,
    },
  ]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState<any | null>(null);
  const [showAddSessionDialog, setShowAddSessionDialog] = useState(false);
  const [newSession, setNewSession] = useState<any>({
    sessionName: "",
    description: "",
    date: "",
    trainer: "No Trainer",
    trainerPresent: false,
  });

  const formatScheduleDate = (date: Date) => {
    return format(date, "EEEE, MMMM dd 'at' HH:mm");
  };

  const handleBackToDashboard = () => {
    router.push(`/dashboard/client/${user?.id}`);
  };

  const handleCancelSession = (session: any) => {
    setSessionToCancel(session);
    setShowCancelPopup(true);
  };

  const confirmCancel = () => {
    if (sessionToCancel) {
      setSchedule((prevSchedule) =>
        prevSchedule.filter((session) => session !== sessionToCancel),
      );
    }
    setShowCancelPopup(false);
  };

  const closeCancelPopup = () => {
    setShowCancelPopup(false);
    setSessionToCancel(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedule((prev) => [
      ...prev,
      {
        ...newSession,
        date: new Date(newSession.date),
      },
    ]);
    setShowAddSessionDialog(false);
    setNewSession({
      sessionName: "",
      description: "",
      date: "",
      trainer: "No Trainer",
      trainerPresent: false,
    });
  };

  const closeAddSessionDialog = () => {
    setShowAddSessionDialog(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 relative p-8">
      {/* Back to Dashboard Button */}
      <button
        onClick={handleBackToDashboard}
        className="absolute top-4 left-4 p-3 bg-green-400 text-white rounded-lg border-none cursor-pointer font-medium z-10"
      >
        Back to Dashboard
      </button>

      {/* Add New Session Button */}
      <button
        onClick={() => setShowAddSessionDialog(true)}
        className="absolute top-4 right-4 p-3 bg-green-400 text-white rounded-lg border-none cursor-pointer font-medium z-10"
      >
        Add Training Session
      </button>

      {/* Page Title */}
      <h2 className="text-4xl font-extrabold mb-8 text-green-400">
        My Schedule
      </h2>

      <div className="max-w-3xl w-full">
        {schedule.length === 0 ? (
          <p>No upcoming sessions found.</p>
        ) : (
          <ul className="list-none p-0">
            {schedule.map((session, index) => (
              <li
                key={index}
                className="bg-gray-800 mb-6 rounded-lg p-6 shadow-lg"
              >
                <div className="text-xl font-bold mb-2">
                  {session.sessionName}
                </div>
                <p className="text-base mb-2 text-gray-400">
                  {session.description}
                </p>
                <div className="text-base text-gray-500">
                  {formatScheduleDate(session.date)}
                </div>
                <div className="text-base mt-2 font-semibold text-gray-200">
                  Trainer: {session.trainer}
                </div>
                <div
                  className={`text-base mt-1 font-semibold ${
                    session.trainerPresent ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {session.trainerPresent
                    ? "Trainer will be present"
                    : "Awaiting Trainer Response"}
                </div>

                {session.trainerPresent && (
                  <button
                    onClick={() => handleCancelSession(session)}
                    className="bg-red-600 text-white py-2 px-6 rounded-md mt-4 transition duration-300 hover:bg-red-700"
                  >
                    Cancel Session
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cancel Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-8 rounded-lg text-center text-white max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to cancel this session?
            </h3>
            <p className="mb-4 text-red-500 font-semibold">
              Remember: Canceling within 24 hours will still result in a charge.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={confirmCancel}
                className="bg-green-400 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-500"
              >
                Yes, Cancel
              </button>
              <button
                onClick={closeCancelPopup}
                className="bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-700"
              >
                No, Keep Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Session Dialog */}
      {showAddSessionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <div className="bg-gray-800 p-8 rounded-lg text-center text-white max-w-md relative">
            <button
              onClick={closeAddSessionDialog}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              X
            </button>
            <h3 className="text-lg font-bold mb-4">Add New Training Session</h3>
            <form onSubmit={handleAddSessionSubmit}>
              <div className="mb-4">
                <label className="block text-left">Session Name</label>
                <input
                  type="text"
                  name="sessionName"
                  value={newSession.sessionName}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-left">Description</label>
                <textarea
                  name="description"
                  value={newSession.description}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-left">Session Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={newSession.date}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-left">Trainer</label>
                <select
                  name="trainer"
                  value={newSession.trainer}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md"
                  required
                >
                  <option value="Leo Swedérus">Leo Swedérus</option>
                  <option value="No Trainer">No Trainer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 text-white py-3 rounded-md mt-4 transition duration-300 hover:bg-green-500"
              >
                Add Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
