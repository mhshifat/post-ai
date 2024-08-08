import { getNotificationsByUser } from "@/actions/notifications";
import { INotification } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useNotification() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    setLoading(true);
    getNotificationsByUser()
      .then((data) => {
        setNotifications(data as INotification[]);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);
  
  return {
    loading,
    notifications
  }
}