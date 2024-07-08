import Table from "@/components/ui/table";

const TABLE_HEADERS = [
  {
    title: "Image",
  },
  {
    title: "Title",
  },
  {
    title: "Price",
  },
]

export default function ProductsTable() {
  return (
    <div>
      <Table className="w-full border border-slate-200 rounded-xl overflow-hidden">
        <Table.Content>
          <Table.Row className="bg-slate-300">
            {TABLE_HEADERS.map((header, headerIdx) => (
              <Table.Cell key={header.title} className="py-2 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                <span className="text-base font-medium">{header.title}</span>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white border-t border-slate-200">
            {TABLE_HEADERS.map((header, headerIdx) => (
              <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                <span className="text-sm font-medium text-slate-500">Data</span>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white border-t border-slate-200">
            {TABLE_HEADERS.map((header, headerIdx) => (
              <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                <span className="text-sm font-medium text-slate-500">Data</span>
              </Table.Cell>
            ))}
          </Table.Row>
          <Table.Row className="bg-white border-t border-slate-200">
            {TABLE_HEADERS.map((header, headerIdx) => (
              <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                <span className="text-sm font-medium text-slate-500">Data</span>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Content>
      </Table>
    </div>
  )
}