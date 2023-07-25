import GoBack from "@/components/commons/GoBack";
import ProductCards from "@/components/product/ProductCards";
import { ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const getData = async (token: string) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/product?token=${token}`, {
    method: "GET",
  });
  const json = await response.json();
  return json.products;
};

const ProductPage = async () => {
  const session = await getServerSession(authOptions)
  const { data }: { data: ProductsFacturAPI[] } = await getData(session?.facturapi_token as string);
  return (
    <main className="flex min-h-screen flex-col dark:bg-zinc-950 bg-whited p-[24px]">
      <GoBack />
      <ProductCards data={data} />
    </main>
  );
};

export default ProductPage;
