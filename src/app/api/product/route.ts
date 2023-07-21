import { Product } from "@/components/product/create-product/types";
import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

interface RequestCreateProduct extends Product {
  taxIncluded: boolean;
}

export async function POST(req: any, res: Response) {
  try {
    const session = await getToken({ req });
    if (!session)
      return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
    const body: RequestCreateProduct = await req.json();

    const product = await facturaApiInstance.post(
      "products",
      {
        description: body.description,
        price: body.price,
        sku: body.sku,
        tax_included: body.taxIncluded,
        product_key: parseInt(body.product_key),
      },
      {
        headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
      }
    );

    const createProduct = await prisma.products.create({
      data: {
        facturapi_id: product.data.id,
        sku: product.data.sku,
        description: product.data.description,
        product_key: product.data.product_key,
        price: product.data.price,
        user_id: session.data.id,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "ok",
      product: product.data,
    });
  } catch (error: any) {
      if(error.response.data.message.includes('Invalid')){
      return NextResponse.json({ message: 'La clave de producto no es válida.' }, { status: 400 })
      }
    
   
  }
}

export async function GET(req: any) {
  const session = await getToken({ req });
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

  const products = await facturaApiInstance.get("products", {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });

  return NextResponse.json({
    status: 200,
    message: "ok",
    products: products.data,
  });
}

export async function DELETE(req: any) {
  const session = await getToken({ req });
  const body = await req.json();
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

  await facturaApiInstance.delete(`products/${body.product_id}`, {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });

  await prisma.products.deleteMany({where: {facturapi_id: body.product_id}})

  return NextResponse.json({
    status: 200,
    message: "ok",
  });
}
