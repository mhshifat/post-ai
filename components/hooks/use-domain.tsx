import { getUnsafeDomainDetails } from "@/actions/domains";
import { IDomain } from "@/utils/types";
import { useEffect, useState } from "react";

export default function useDomain({ domainId }: { domainId: string }) {
  const [domainDetails, setDomainDetails] = useState<IDomain | null>(null);

  useEffect(() => {
    if (!domainId) return;
    getUnsafeDomainDetails(domainId)
      .then(details => {
        setDomainDetails(details as unknown as IDomain);
      })
  }, [domainId])

  return {
    domainDetails
  }
}