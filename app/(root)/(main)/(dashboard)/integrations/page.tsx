import { getConnections } from "@/actions/connections";
import IntegrationsList from "@/components/modules/integrations/integrations-list";

export default async function Integrations() {
  const connections = await getConnections();
  
  return  (
    <div className="w-full h-full p-5 flex flex-col gap-10 bg-background">
      <IntegrationsList
        connections={connections}
      />
    </div>
  )
}