import { getConnections } from "@/actions/connections";
import IntegrationsList from "@/components/modules/integrations/integrations-list";

export default async function Integrations() {
  const connections = await getConnections();
  
  return  (
    <div className="w-full h-full py-2 px-3 flex flex-col gap-10">
      <IntegrationsList
        connections={connections}
      />
    </div>
  )
}