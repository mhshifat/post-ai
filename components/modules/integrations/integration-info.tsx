import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useConnection from "@/components/hooks/use-connection";
import { handleError } from "@/utils/error";
import { IConnectionType } from "@/utils/types";

export default function IntegrationInfo({ type }: { type: IConnectionType }) {
  const { startConnection } = useConnection();
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    try {
      setLoading(true);
      await startConnection(type);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full">
      <div className="flex items-center gap-5 justify-between">
        <Button variant="outline">Learn More</Button>
        <Button disabled={loading} onClick={handleConnect}>
          {loading ? <Spinner /> : "Connect"}
        </Button>
      </div>
    </div>
  )
}