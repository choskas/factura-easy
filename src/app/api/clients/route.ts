import { Customer } from "@/components/create-customer/types";
import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

interface RequestCustomer extends Customer {}

export async function GET(req: any, res: Response) {
  const token = req.nextUrl.searchParams.get("token")
  const page = req.nextUrl.searchParams.get("page")
  if (!token)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const customers = await facturaApiInstance.get(`customers/?page=${page ? page : 1}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return NextResponse.json({
    status: 200,
    message: "ok",
    customers: customers.data,
  });
}

export async function POST(req: any, res: Response) {
  try {
  const session = await getToken({ req });

  const body: RequestCustomer = await req.json();
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const customers = await facturaApiInstance.post("customers", body, {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });

  const customerPrismaResponse = await prisma.customers.create({
    data: {
      user_id: session.data.id,
      facturapi_id: customers.data.id,
      legal_name: customers.data.legal_name,
      tax_id: customers.data.tax_id.toUpperCase(),
      tax_system: customers.data.tax_system,
      email: customers.data.email.toLowerCase(),
      phone: customers.data.phone,
    },
  });

  return NextResponse.json({ status: 200, message: "ok", customers: customers.data });
} catch (error: any) {
  if (error.response.data){
  return NextResponse.json({message: "", ...error.response.data }, {status: 400});
  }
  return NextResponse.json({message: "", data: {path: '500', message: 'Error de servidor'} }, {status: 500});
}
}

export async function DELETE(req: any) {
  const session = await getToken({ req });
  const body = await req.json();
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

  await facturaApiInstance.delete(`customers/${body.client_id}`, {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });

  await prisma.customers.deleteMany({where: {facturapi_id: body.client_id}})

  return NextResponse.json({
    status: 200,
    message: "ok",
  });
}