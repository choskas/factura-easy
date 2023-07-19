import { Customer } from "@/components/create-customer/types";
import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

interface RequestCustomer extends Customer {}

export async function GET(req: any, res: Response) {
  const session = await getToken({ req });
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const customers = await facturaApiInstance.get("customers", {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });
  return NextResponse.json({
    status: 200,
    message: "ok",
    customers: customers.data,
  });
}

export async function POST(req: any, res: Response) {
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
      tax_id: customers.data.tax_id,
      tax_system: customers.data.tax_system,
      email: customers.data.email,
      phone: customers.data.phone,
    },
  });

  console.log(customerPrismaResponse);

  return NextResponse.json({ status: 200, message: "ok", customers: customers.data });
}
