"use client";

import { useDialog } from "@/components/providers/dialog-provider"
import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/divider"
import { CloudIcon } from "lucide-react"
import Image from "next/image"
import IntegrationsModalWrapper from "./integrations-modal-wrapper"
import StripeIntegrationInfo from "./stripe-integration-info";
import { IConnectionsWithUserId } from "@/utils/types";

const INTEGRATIONS = [
  {
    id: "1",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s",
    title: "Stripe",
    type: "stripe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, minus esse! Recusandae fugit magni natus!"
  }
]

export default function IntegrationsList({ connections }: { connections: IConnectionsWithUserId }) {
  const { openDialog } = useDialog();

  return (
    <div className="w-full flex gap-10 flex-wrap">
      {INTEGRATIONS.map(card => {
        const conn = connections?.find(c => c.type === card.type);
        return (
          <div key={card.id} className="border border-s-slate-200 px-3 py-2 rounded-lg max-w-[400px]">
            <div className="flex justify-between items-center gap-5">
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
              })} disabled={!!conn} variant="outline" className="flex items-center gap-2">
                <CloudIcon />
  
                <span>{conn ? `Connected to ${card.title}` : "Connect"}</span>
              </Button>
            </div>
            <Divider className="my-3" />
            <div>
              <h3 className="text-lg font-medium">{card.title}</h3>
              <p className="text-sm font-medium text-slate-500">{card.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}