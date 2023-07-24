import { ProductsWithQuantity } from "@/components/invoice/create";
import prisma from "@/lib/prisma";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function DELETE(req: any, res: Response) {
    try {
      const session = await getToken({ req });
      const invoice_id = req.nextUrl.searchParams.get("invoice_id")
      const motive = req.nextUrl.searchParams.get("motive")
      if (!session)
        return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
      if (!invoice_id) return NextResponse.json({ message: "Falta la llave invoice_id" }, { status: 400 });
      const invoice = await facturaApiInstance.delete(
        `invoices/${invoice_id}?motive=${motive}`,
        {
          headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
        }
      );
      await prisma.invoices.updateMany({
        where: {
          facturapi_id: invoice_id
        },
        data: {
          status: invoice.data.status
        },
      });
      return NextResponse.json({
        status: 200,
        message: `La factura ${invoice.data.folio_number} se ha cancelado.`,
        invoices: invoice.data,
      });
    } catch (error: any) {

        return error
      
     
    }
  }
