import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

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

export default function Customers() {
  return (
    <Table
      className="w-full border border-slate-200 rounded-xl overflow-hidden"
      renderPrefix={() => (
        <Table.Cell className="py-2 px-3 w-0" align="left">
          <Checkbox
            type="checkbox"
            className="w-full h-full flex items-center"
            renderItem={({ title, metadata, isChecked }) => (
              <div className={cn("w-full h-full relative border border-slate-200 rounded-sm shadow-inner flex items-center gap-5", {
                "border-[#007DFC]": isChecked
              })}>
                {isChecked && <span className="w-full h-full rounded bg-[#007DFC] flex items-center justify-center">
                  <CheckIcon className="size-4 text-white" />
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
      renderSuffix={({ type }) => (
        <Table.Cell className="py-2 px-3 w-0" align="right">
          <div className="p-0">
            {type === 'body' && <Button size="sm">View</Button>}
          </div>
        </Table.Cell>
      )}
    >
      <Table.Content>
        <Table.Row className="bg-slate-300" type="header">
          {TABLE_HEADERS.map((header) => (
            <Table.Cell key={header.title} className="py-2 px-3">
              <span className="text-base font-medium">{header.title}</span>
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row className="bg-white border-t border-slate-200">
          {TABLE_HEADERS.map((header) => (
            <Table.Cell key={header.title} className="py-3 px-3">
              <span className="text-sm font-medium text-slate-500">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row className="bg-white border-t border-slate-200">
          {TABLE_HEADERS.map((header) => (
            <Table.Cell key={header.title} className="py-3 px-3">
              <span className="text-sm font-medium text-slate-500">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row className="bg-white border-t border-slate-200">
          {TABLE_HEADERS.map((header) => (
            <Table.Cell key={header.title} className="py-3 px-3">
              <span className="text-sm font-medium text-slate-500">Data</span>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Content>
    </Table>
  )
}