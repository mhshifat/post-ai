"use client";

import Table from "@/components/ui/table";

const TABLE_HEADERS = [
  {
    title: "Name",
  },
  {
    title: "Time",
  },
  {
    title: "Domain",
  },
]

export default function AppointmentsList() {
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
        <Table.Row className="bg-background border-t border-border">
          {TABLE_HEADERS.map((header, headerIdx) => (
            <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
              <span className="text-sm font-medium text-foreground/50">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row className="bg-background border-t border-border">
          {TABLE_HEADERS.map((header, headerIdx) => (
            <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
              <span className="text-sm font-medium text-foreground/50">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row className="bg-background border-t border-border">
          {TABLE_HEADERS.map((header, headerIdx) => (
            <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
              <span className="text-sm font-medium text-foreground/50">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Content>
    </Table>
  )
}