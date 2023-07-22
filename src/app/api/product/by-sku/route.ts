import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: any, res: Response) {
    const session = await getToken({ req });
   
    if (!session)
      return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

      const search = req.nextUrl.searchParams.get("search")

      const result = await prisma.products.findMany({where: {
        sku: search
      }})

    const product = await facturaApiInstance.get(`products/${result[0].facturapi_id}`, {
      headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
    });

    return NextResponse.json({
      status: 200,
      message: "ok",
      products: product.data,
    });
  }