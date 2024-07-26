import useConnection from "@/components/hooks/use-connection";
import NotFound from "@/components/shared/not-found";
import Alert from "@/components/ui/alert";
import Table from "@/components/ui/table";
import { IConnectionType, IProductsWithDomainId } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

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
        className="block rounded-md border-2 border-border"
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
  const { hasConnection } = useConnection();

  return (
    <div>
      {!hasConnection(IConnectionType.STRIPE) && (
        <Alert className="mb-5">You do not have linked with stripe account, your customer will not be able to purchase your product. To connect to your stripe account, <Link href="/integrations" className="underline">Click Here</Link></Alert>
      )}
      <Table className="w-full border border-border rounded-xl overflow-hidden">
        <Table.Content>
          <Table.Row className="bg-background-secondary">
            {TABLE_HEADERS.map((header, headerIdx) => (
              <Table.Cell key={header.title} className="py-2 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                <span className="text-base font-medium">{header.title}</span>
              </Table.Cell>
            ))}
          </Table.Row>
          {products?.map(pro => (
            <Table.Row key={pro.id} className="bg-background border-t border-border">
              {TABLE_HEADERS.map((header, headerIdx) => (
                <Table.Cell key={header.title} className="py-3 px-3" align={headerIdx === TABLE_HEADERS.length - 1 ? "right" : "left"}>
                  <span className="text-sm font-medium text-foreground/50">{header.render ? header.render({
                    colData: pro[header.key as keyof typeof pro],
                    rowData: pro
                  }) : pro[header.key as keyof typeof pro]}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          {!products?.length && (
            <Table.Row className="bg-background border-t border-border">
              <Table.Cell colSpan={3} className="py-3 px-3">
                <NotFound />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Content>
      </Table>
    </div>
  )
}