import { getThreadDetails } from "@/actions/threads";
import { useState } from "react";

export default function useThread(props: {
  domainId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function fetchThreadDetails(threadId: string) {
    const details = await getThreadDetails(threadId);
    return details;
  }
  return {
    loading,
    fetchThreadDetails
  }
}