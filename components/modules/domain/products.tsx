"use client";

import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import { cn } from "@/lib/utils";
import ProductsTable from "./products-table";
import { useDialog } from "@/components/providers/dialog-provider";
import CreateProductForm from "./create-product-form";
import { useRouter } from "next/navigation";
import { IProductsWithDomainId } from "@/utils/types";

export default function Products({ domainId, products }: { domainId: string; products: IProductsWithDomainId }) {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  return (
    <Tab className="flex flex-col h-full">
      <div className="flex items-center gap-5 justify-between mb-5">
        <Tab.List
          className="flex items-center bg-foreground/10 rounded-lg p-1 [&>*]:flex-1"
          renderItem={({ content, isSelected }) => (
            <span className={cn("w-full flex justify-center items-center font-medium text-foreground text-sm gap-1 bg-transparent rounded-md cursor-pointer py-1 px-3 whitespace-nowrap", {
              "bg-background": isSelected
            })}>
              {content}
            </span>
          )}
        />

        <Button variant="outline" onClick={() => openDialog({
            title: "Create a product",
            description: "Please fill the necessary information to complete the product creation",
            content: <CreateProductForm domainId={domainId} onSubmit={() => {
              closeDialog();
              router.refresh();
            }} />
          })}>Add Product</Button>
      </div>

      <Tab.Item>
        <Tab.Trigger>
          All Products
        </Tab.Trigger>
        <Tab.Content
          className="flex-1 overflow-y-auto"
        >
          <ProductsTable products={products} />
        </Tab.Content>
      </Tab.Item>
      <Tab.Item>
        <Tab.Trigger>
          Live
        </Tab.Trigger>
        <Tab.Content
          className="flex-1 overflow-y-auto"
        >
          <ProductsTable products={products} />
        </Tab.Content>
      </Tab.Item>
      <Tab.Item>
        <Tab.Trigger>
          Deactivated
        </Tab.Trigger>
        <Tab.Content
          className="flex-1 overflow-y-auto"
        >
          <ProductsTable products={products} />
        </Tab.Content>
      </Tab.Item>
    </Tab>
  )
}