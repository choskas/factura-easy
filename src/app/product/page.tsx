import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import Nextauth from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import { headers } from "next/headers";

const getData = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/product`, {
    method: "GET",
    headers: headers(),
  });
  const json = await response.json();
  return json.products;
};

const ProductPage = async () => {
  const { data }: { data: ProductsFacturAPI[] } = await getData();
  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </main>
  );
};

export default ProductPage;
