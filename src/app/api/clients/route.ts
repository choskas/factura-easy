import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: any, res: Response) {
  const session = await getToken({ req });
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const customers = await facturaApiInstance.get("customers", {
    headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
  });
  return NextResponse.json({status: 200, message: "ok", customers: customers.data});
}
