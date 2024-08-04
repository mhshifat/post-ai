import { getConnections, getConnectionsByDomain } from "@/actions/connections";
import { startGoogleMeetConnection } from "@/actions/google";
import { startStripeConnection } from "@/actions/stripe";
import { IConnection, IConnectionType } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";

export default function useConnection(props: { domainId?: string }) {
  const [connections, setConnections] = useState<IConnection[]>([]);

  const hasConnection = useCallback((type: IConnectionType) => {
    return connections.some(c => c.type === type);
  }, [connections])

  const getConnection = useCallback((type: IConnectionType) => {
    return connections.find(c => c.type === type);
  }, [connections])

  useEffect(() => {
    if (props?.domainId) fetchConnectionByDomain(props?.domainId);
    else fetchConnections();
  }, [props?.domainId]);
  
  async function fetchConnections() {
    const connections = await getConnections()
    setConnections(connections as IConnection[]);
  }
  async function fetchConnectionByDomain(domain: string) {
    const connections = await getConnectionsByDomain(domain)
    setConnections(connections as IConnection[]);
  }
  async function startConnectionProcess(type: IConnectionType) {
    switch (type) {
      case IConnectionType.STRIPE:
        return startStripeConnection();
      case IConnectionType.GOOGLE_MEET:
        return startGoogleMeetConnection();
    }
  }
  return {
    hasConnection,
    getConnection,
    refetchConnections: props?.domainId ? fetchConnectionByDomain : fetchConnections,
    startConnection: startConnectionProcess
  }
}