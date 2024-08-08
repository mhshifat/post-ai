import useNotification from "@/components/hooks/use-notification";
import NotFound from "@/components/shared/not-found";
import Spinner from "@/components/shared/spinner";

export default function NotificationList() {
  const { loading, notifications } = useNotification();

  if (loading) return <Spinner />;
  if (!notifications.length) return <NotFound />;
  return (
    <ul className="w-full text-foreground flex flex-col">
      {notifications.map(notification => (
        <li
          key={notification.id} 
          className="text-sm py-2"
          dangerouslySetInnerHTML={{
            __html: notification.content
          }}
        />
      ))}
    </ul>
  )
}