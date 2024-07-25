import Pusher from 'pusher-js';
import SPusher from 'pusher';

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: 'ap1'
});

export const pusherServerClient = new SPusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: "ap1",
  useTLS: true
});