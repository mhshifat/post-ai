"use client";

import NotFound from "@/components/shared/not-found";
import Table from "@/components/ui/table";
import { IAppointmentWithDomain } from "@/utils/types";
import { ReactNode } from "react";

const TABLE_HEADERS = [
  {
    title: "Date",
    key: "date"
  },
  {
    title: "Time",
    key: "time"
  },
  {
    title: "Domain",
    key: "domain"
  },
  {
    title: "Customer",
    key: "email"
  },
]

export default function AppointmentsList({ appointments }: { appointments: IAppointmentWithDomain }) {
  return (
    <Table className="w-full border border-border rounded-xl overflow-hidden">
      <Table.Content>
        <Table.Row className="bg-background-secondary">
          {TABLE_HEADERS.map((header, headerIdx) => (
            <Table.Cell key={header.title} className="py-2 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
              <span className="text-base font-medium text-foreground">{header.title}</span>
            </Table.Cell>
          ))}
        </Table.Row>
        {appointments.map(appointment => (
          <Table.Row key={appointment.id} className="bg-background border-t border-border">
            {TABLE_HEADERS.map((header, headerIdx) => {
              const domain = appointment.domain;
              const customer = appointment.customer;
              return (
                <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                  <span className="text-sm font-medium text-foreground/50">{(customer?.[header.key as keyof typeof customer] || domain?.[header.key as keyof typeof domain] || appointment[header.key as keyof typeof appointment]) as ReactNode}</span>
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
        {!appointments.length && (
          <Table.Row className="bg-background border-t border-border">
            <Table.Cell colSpan={TABLE_HEADERS.length} className="py-3 px-3">
              <NotFound />
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Content>
    </Table>
  )
}