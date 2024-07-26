"use client";

import useConnection from "@/components/hooks/use-connection";
import Alert from "@/components/ui/alert";
import { IConnectionType } from "@/utils/types";
import Link from "next/link";

export default function AppointmentsBanners() {
  const { hasConnection } = useConnection();

  return (
    <>
      {!hasConnection(IConnectionType.GOOGLE_MEET) && (
        <Alert>You do not have linked with your google account, Your user will not be able to create a booking. To connect to google account, <Link href="/integrations" className="underline">Click Here</Link></Alert>
      )}
    </>
  )
}