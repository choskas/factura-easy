import prisma from "@/lib/prisma";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: any, res: Response) {
    const session = await getToken({ req });
   
    if (!session)
      return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

      const search = req.nextUrl.searchParams.get("search")

      const result = await prisma.customers.findMany({where: {
        OR: [
          {
            email: search, // Replace 'your-email@example.com' with the email you want to match
          },
          {
            tax_id: search, // Replace 'John Doe' with the name you want to match
          },
        ],
      }})

    const customer = await facturaApiInstance.get(`customers/${result[0].facturapi_id}`, {
      headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
    });

    return NextResponse.json({
      status: 200,
      message: "ok",
      customers: customer.data,
    });
  }