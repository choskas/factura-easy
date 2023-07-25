import { ProductsWithQuantity } from "@/components/invoice/create";
import prisma from "@/lib/prisma";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import facturaApiInstance from "@/services/config/facturaApi";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function GET(req: any, res: Response) {
    try {
      const token = req.nextUrl.searchParams.get("token")
      if (!token)
        return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });

      const invoice = await facturaApiInstance.get(
        "invoices",
        {
          headers: { Authorization: `Bearer ${token}` },
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
