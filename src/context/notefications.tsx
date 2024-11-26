import { NotificationContextType, Notification } from "@/types";
import { createContext, useEffect, useState, ReactNode } from "react";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch(`/api/notifications`)
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  const addNotification = (message: string) => {
    setNotifications((prev) => [
      ...prev,
      {
        notificationId: Date.now(),
        message,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
