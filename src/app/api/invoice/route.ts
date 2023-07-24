import { ProductsWithQuantity } from "@/components/invoice/create";
import prisma from "@/lib/prisma";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function GET(req: any, res: Response) {
    try {
      const session = await getToken({ req });
      if (!session)
        return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

      const invoice = await facturaApiInstance.get(
        "invoices",
        {
          headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
        }
      );

      return NextResponse.json({
        status: 200,
        message: "ok",
        invoices: invoice.data,
      });
    } catch (error: any) {
        return error
      
     
    }
  }
