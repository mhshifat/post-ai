"use client";

import { useDialog } from "@/components/providers/dialog-provider"
import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/divider"
import { CloudIcon, CheckIcon } from "lucide-react"
import Image from "next/image"
import IntegrationsModalWrapper from "./integrations-modal-wrapper"
import { IConnectionsWithUserId, IConnectionType } from "@/utils/types";
import { cn } from "@/lib/utils";
import IntegrationInfo from "./integration-info";
import useConnection from "@/components/hooks/use-connection";

const INTEGRATIONS = [
  {
    id: "1",
    logo: "/images/stripe.png",
    title: "Stripe",
    type: IConnectionType.STRIPE,
    description: "Connect to your stripe account to sell your products to your customer."
  },
  {
    id: "2",
    logo: "/images/google-meet.png",
    title: "Google Meet",
    type: IConnectionType.GOOGLE_MEET,
    description: "Connect to your google account so that we can generate a google meet appointment link"
  },
]

export default function IntegrationsList({ connections }: { connections: IConnectionsWithUserId }) {
  const { openDialog } = useDialog();
  const { hasConnection } = useConnection({});

  return (
    <div className="w-full grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
      {INTEGRATIONS.map(card => {
        const conn = hasConnection(card.type);
        return (
          <div key={card.id} className="border border-border rounded-lg bg-background-secondary">
            <div className="flex justify-between items-center gap-5 px-3 py-2">
              <Image
                src={card.logo}
                alt="stripe logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
  
              <Button onClick={() => openDialog({
                content: (
                  <IntegrationsModalWrapper
                    logo={card.logo}
                    title="Connect Stripe Account"
                    description={card.description}
                  >
                    <IntegrationInfo
                      type={card.type}
                    />
                  </IntegrationsModalWrapper>
                )
              })} variant={"outline"} className="flex items-center gap-2 border border-border bg-background">
                {!conn && <CloudIcon className={cn("size-4 text-foreground")} />}
                {conn && <CheckIcon className={cn("size-4 text-foreground")} />}
  
                <span className={cn("text-foreground")}>{conn ? "Connected" : "Connect"}</span>
              </Button>
            </div>
            <Divider />
            <div className="px-3 py-2">
              <h3 className="text-lg font-medium text-foreground">{card.title}</h3>
              <p className="text-sm font-medium text-foreground/50 mt-1">{card.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}