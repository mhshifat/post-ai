"use client";

import { useDialog } from "@/components/providers/dialog-provider"
import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/divider"
import { CloudIcon } from "lucide-react"
import Image from "next/image"
import IntegrationsModalWrapper from "./integrations-modal-wrapper"
import StripeIntegrationInfo from "./stripe-integration-info";
import { IConnectionsWithUserId } from "@/utils/types";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  {
    id: "1",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s",
    title: "Stripe",
    type: "stripe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, minus esse! Recusandae fugit magni natus!"
  },
  {
    id: "2",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s",
    title: "Google Meet",
    type: "google_meet",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, minus esse! Recusandae fugit magni natus!"
  },
]

export default function IntegrationsList({ connections }: { connections: IConnectionsWithUserId }) {
  const { openDialog } = useDialog();

  return (
    <div className="w-full grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
      {INTEGRATIONS.map(card => {
        const conn = false;
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
                    <StripeIntegrationInfo />
                  </IntegrationsModalWrapper>
                )
              })} disabled={!!conn} variant="outline" className="flex items-center gap-2 border border-border bg-background">
                <CloudIcon className={cn("size-4 text-foreground", {
                  "text-foreground/50": conn
                })} />
  
                <span className={cn("text-foreground", {
                  "text-foreground/50": conn
                })}>{conn ? `Connected to ${card.title}` : "Connect"}</span>
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