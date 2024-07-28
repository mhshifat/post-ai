import { getProducts } from "@/actions/products";
import { IProduct } from "@/utils/types";
import { useEffect, useMemo, useState } from "react";

export default function useProduct(props: { domainId: string }) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const totalProductPrice = useMemo(() => {
    return products?.reduce((acc, val) => acc+=+(val.price), 0)
  }, [products]);

  useEffect(() => {
    if (!props.domainId) return;
    fetchProducts();
  }, [props.domainId]);
  
  async function fetchProducts() {
    const products = await getProducts(props.domainId);
    setProducts(products as IProduct[]);
  }
  return {
    products,
    refetchProducts: fetchProducts,
    totalProductPrice
  }
}