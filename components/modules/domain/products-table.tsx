import Table from "@/components/ui/table";
import { IProductsWithDomainId } from "@/utils/types";
import Image from "next/image";

const TABLE_HEADERS = [
  {
    title: "Image",
    key: "image",
    render: ({ colData, rowData }:{ colData: unknown; rowData: unknown }) => (
      <Image
        src={colData as string}
        alt={(rowData as { title: string }).title}
        width={40}
        height={40}
        className="block rounded-md border-2 border-slate-200"
      />
    )
  },
  {
    title: "Title",
    key: "title",
  },
  {
    title: "Price",
    key: "price",
    render: ({ colData }:{ colData: unknown; rowData: unknown }) => (
      <span>${colData as string}</span>
    )
  },
]

export default function ProductsTable({ products }: { products: IProductsWithDomainId }) {
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
          {products?.map(pro => (
            <Table.Row key={pro.id} className="bg-white border-t border-slate-200">
              {TABLE_HEADERS.map((header, headerIdx) => (
                <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                  <span className="text-sm font-medium text-slate-500">{header.render ? header.render({
                    colData: pro[header.key as keyof typeof pro],
                    rowData: pro
                  }) : pro[header.key as keyof typeof pro]}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Content>
      </Table>
    </div>
  )
}