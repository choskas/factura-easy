import GoBack from "@/components/commons/GoBack";
import ProductCards from "@/components/product/ProductCards";
import { ProductsFacturAPI } from "@/lib/types/facturapiTypes";
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
      <GoBack />
      <ProductCards data={data} />
    </main>
  );
};

export default ProductPage;
