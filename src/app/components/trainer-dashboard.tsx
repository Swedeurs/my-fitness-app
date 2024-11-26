import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Client, Notification } from "@/types";
import Chat from "./chat";


export default function TrainerDashboard() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`/api/notifications?userId=${user.id}`);
          const data = await response.json();
          setNotifications(data);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
      fetchNotifications();

      const fetchClients = async () => {
        try {
          const response = await fetch(`/api/trainers/${user.id}/clients`);
          if (!response.ok) {
            throw new Error(`Trainer not found or error fetching trainer. Status: ${response.status}`);
          }
          const data = await response.json();
          setClients(data);
        } catch (error) {
          console.error("Failed to fetch clients:", error);
        }
      };
      fetchClients();
    }
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">Notifications</h2>
      <ul className="mb-10">
        {notifications.length === 0 ? (
          <p>No notifications at the moment.</p>
        ) : (
          notifications.map((notification) => (
            <li key={notification.notificationId} className="bg-gray-100 p-4 mb-2 rounded-md shadow">
              {notification.message} - {new Date(notification.timestamp).toLocaleString()}
            </li>
          ))
        )}
      </ul>

      <h2 className="text-3xl font-bold mb-6">My Clients</h2>
      <div className="grid gap-6">
        {clients.length === 0 ? (
          <p>No clients assigned yet.</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="border rounded-lg p-6 bg-white shadow-md">
              <p className="text-xl font-semibold">{client.name}</p>
              <p className="text-gray-700 mb-4">{client.email}</p>
              <button
                onClick={() => setSelectedClient(client)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              >
                {selectedClient && selectedClient.id === client.id ? "Close Chat" : `Chat with ${client.name}`}
              </button>
            </div>
          ))
        )}
      </div>

      {selectedClient && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Chat with {selectedClient.name}</h2>
          <Chat otherUserId={selectedClient.id} />
          <button
            onClick={() => setSelectedClient(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition mt-4"
          >
            Close Chat
          </button>
        </div>
      )}
    </div>
  );
}
