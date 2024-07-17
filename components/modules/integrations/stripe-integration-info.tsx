import Spinner from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import axios from 'axios';

export default function StripeIntegrationInfo() {
  const [loading, setLoading] = useState(false);

  async function connectStripe() {
    try {
      setLoading(true);
      const { data: { url } } = await axios.get("/api/connections/stripe");
      window.location.href = url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-left mt-5 mb-2">Stripe would like to access</h3>
      <ul className="pl-3 flex flex-col gap-2">
        <li className="flex items-center gap-2 text-sm font-medium text-foreground/50">
          <CheckCircle2Icon className="size-4" />
          Payment and bank information.
        </li>
        <li className="flex items-center gap-2 text-sm font-medium text-foreground/50">
          <CheckCircle2Icon className="size-4" />
          Products and services you sell.
        </li>
        <li className="flex items-center gap-2 text-sm font-medium text-foreground/50">
          <CheckCircle2Icon className="size-4" />
          Business and ax information.
        </li>
        <li className="flex items-center gap-2 text-sm font-medium text-foreground/50">
          <CheckCircle2Icon className="size-4" />
          Create and update products.
        </li>
      </ul>
      <Divider className="my-8" />
      <div className="flex items-center gap-5 justify-between">
        <Button variant="outline">Learn More</Button>
        <Button disabled={loading} onClick={connectStripe}>
          {loading ? <Spinner /> : "Connect"}
        </Button>
      </div>
    </div>
  )
}