"use server";

import { google } from 'googleapis';
import { googleOAuthClient } from "@/lib/google";
import { redirect } from "next/navigation";
import { getUserDetails } from "./users";
import { getConnectionBy } from './connections';
import { IConnectionType } from '@/utils/types';
import { v4 } from 'uuid';

export async function startGoogleMeetConnection() {
  const user = await getUserDetails();
  if (!user) throw new Error("Invalid request");
  const authUrl = googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: process.env.GOOGLE_MEET_SCOPES?.split(","),
    state: JSON.stringify({
      userId: user.id
    })
  });
  
  return redirect(authUrl);
}

export async function scheduleMeet(args: {
  title: string;
  description: string;
  email: string;
  date: {
    start: string;
    end: string;
    timezone: string;
  };
}) {
  const user = await getUserDetails();
  if (!user) throw new Error("Invalid request");
  const connection = await getConnectionBy({
    type: IConnectionType.GOOGLE_MEET,
    userId: user.id
  });
  if (!connection) throw new Error("Invalid request");
  const credentials = JSON.parse(connection.metadata);
  googleOAuthClient.setCredentials(credentials);
  const calendar = google.calendar({ version: 'v3', auth: googleOAuthClient });
  const event = {
    summary: args.title,
    location: 'Online',
    description: args.description,
    start: {
      dateTime: args.date.start, // Change to your start time
      timeZone: args.date.timezone, // Asia/Dhaka
    },
    end: {
      dateTime: args.date.end, // Change to your end time
      timeZone: args.date.timezone,
    },
    attendees: [
      { email: args.email }, // Change to attendee's email
    ],
    conferenceData: {
      createRequest: {
        requestId: v4(),
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        },
      },
    },
    reminders: {
      useDefault: true,
    },
  };

  const createdLink = await new Promise((res, rej) => {
    calendar.events.insert(
      {
        auth: googleOAuthClient,
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: event,
        sendUpdates: 'all',
      },
      (err: unknown, createdEvent: unknown) => {
        if (err) return rej(err);
        const link = (createdEvent as { data: { hangoutLink: string } }).data.hangoutLink;
        res(link);
      }
    )
  });

  return createdLink as string;
}