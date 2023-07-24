import { Customer } from "@/components/create-customer/types";
import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

interface RequestCustomer extends Customer {}

export async function GET(req: any, res: Response) {
  const session = await getToken({ req });
  const id = req.nextUrl.searchParams.get("id")
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const customer = await facturaApiInstance.get(`customers/${id}`, {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });
  return NextResponse.json({
    status: 200,
    message: "ok",
    customer: customer.data,
  });
}

