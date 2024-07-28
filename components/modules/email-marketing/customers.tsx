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

  return (
    <div className="flex-1 w-full h-full">
      <div className="flex items-center justify-end gap-2">
        <CreateCustomerBtnWrapper domains={domains} />
      </div>

      <Table
        className="w-full border border-border rounded-xl overflow-hidden mt-5"
        renderPrefix={({ type }) => (
          <>
            {type !== "extra" && (
              <Table.Cell className="py-2 px-3 w-0" align="left">
                {/* TODO: Make it functional */}
                <Checkbox
                  type="checkbox"
                  className="w-full h-full flex items-center"
                  renderItem={({ title, metadata, isChecked }) => (
                    <div className={cn("w-full h-full relative border border-border rounded-sm shadow-inner flex items-center gap-5", {
                      "border-primary": isChecked
                    })}>
                      {isChecked && <span className="w-full h-full rounded bg-primary flex items-center justify-center">
                        <CheckIcon className="size-4 text-background" />
                      </span>}
                    </div>
                  )}
                  onChange={({ checked, item }) => {}}
                >
                  <Checkbox.Item
                    title="I own a business"
                    value="business"
                    className="w-5 h-5 flex"
                    metadata={{
                      description: "Setting up my account for my company",
                    }}
                  />
                </Checkbox>
              </Table.Cell>
            )}
          </>
        )}
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