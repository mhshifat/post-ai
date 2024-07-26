import { getConnections } from "@/actions/connections";
import { startStripeConnection } from "@/actions/stripe";
import { IConnection, IConnectionType } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";

export default function useConnection() {
  const [connections, setConnections] = useState<IConnection[]>([]);

  const hasConnection = useCallback((type: IConnectionType) => {
    return connections.some(c => c.type === type);
  }, [connections])

  useEffect(() => {
    fetchConnections();
  }, []);
  
  async function fetchConnections() {
    const connections = await getConnections()
    setConnections(connections as IConnection[]);
  }
  async function startConnectionProcess(type: IConnectionType) {
    switch (type) {
      case IConnectionType.STRIPE:
        return startStripeConnection();
    }
  }
  return {
    hasConnection,
    refetchConnections: fetchConnections,
    startConnection: startConnectionProcess
  }
}