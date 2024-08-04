"use client";

import { useDialog } from "@/components/providers/dialog-provider";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckIcon, Plus } from "lucide-react";
import FilterQuestions from "../domain/filter-questions";
import NotFound from "@/components/shared/not-found";
import CreateCustomerBtnWrapper from "./create-customer-btn-wrapper";
import { ICustomer, ICustomerWithDomain, IDomain } from "@/utils/types";
import { ReactNode } from "react";
import CustomerSurveyResult from "./customer-surveys-result";
import { useCampaignStore } from "@/components/hooks/use-campaign-store";

const TABLE_HEADERS = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Domain",
    key: "domain",
  },
]

interface CustomersProps {
  domains: Partial<IDomain>[];
  customers: ICustomerWithDomain;
}

export default function Customers({ domains, customers }: CustomersProps) {
  const { openDialog } = useDialog();
  const { setSelectedCustomers, reset } = useCampaignStore();

  function handleCustomersSelected(customers: ICustomerWithDomain) {
    setSelectedCustomers(customers.map(c => c.id));
  }
  return (
    <div className="flex-1 w-full h-full">
      <div className="flex items-center justify-end gap-2">
        <CreateCustomerBtnWrapper domains={domains} />
      </div>

      <Table
        key={`Customers_${reset}`}
        selectable
        onSelected={(values) => handleCustomersSelected(
          values.includes("*") ? customers : values.map(id => customers.find(c => c.id === id)).filter(Boolean) as ICustomerWithDomain
        )}
        selectableDisabled={!customers.length}
        selectableCheckedContent={(
          <span className="w-5 h-5 border border-primary rounded bg-primary flex items-center justify-center">
            <CheckIcon className="size-4 text-foreground/80" />
          </span>
        )}
        selectableUncheckedContent={(
          <span className="w-5 h-5 border border-border rounded bg-transparent flex items-center justify-center" />
        )}
        className="w-full border border-border rounded-xl overflow-hidden mt-5"
        renderSuffix={({ type, data }) => (
          <Table.Cell className="py-2 px-3 w-0" align="right">
            <div className="p-0">
              {type === 'body' && (
                <Button variant="ghost" onClick={() => openDialog({
                  position: "right",
                  title: "Answered Questions",
                  description: "Answers of the filtered Questions",
                  content: <CustomerSurveyResult
                    customerId={(data as ICustomerWithDomain[0]).id}
                    domainId={(data as ICustomerWithDomain[0]).domainId}
                  />
                })} size="sm" className="text-foreground">View</Button>
              )}
            </div>
          </Table.Cell>
        )}
      >
        <Table.Content>
          <Table.Row className="bg-background-secondary" type="header">
            {TABLE_HEADERS.map((header) => (
              <Table.Cell key={header.title} className="py-2 px-3">
                <span className="text-base font-medium text-foreground">{header.title}</span>
              </Table.Cell>
            ))}
          </Table.Row>
          {customers.map(c => {
            const d = c.domain;
            return (
              <Table.Row key={c.id} className="bg-background border-t border-border" type="body" data={c}>
                {TABLE_HEADERS.map((header) => {
                  const data = (d?.[header.key as keyof typeof d] || c?.[header.key as keyof typeof c]) as ReactNode;
                  return (
                    <Table.Cell key={header.title} className="py-3 px-3">
                      <span className="text-sm font-medium text-foreground/50">{data}</span>
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            )
          })}
          {!customers.length && (
            <Table.Row className="bg-background border-t border-border" type="extra">
              <Table.Cell colSpan={4} className="py-3 px-3">
                <NotFound />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Content>
      </Table>
    </div>
  )
}