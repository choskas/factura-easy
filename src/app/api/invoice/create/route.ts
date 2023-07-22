import { ProductsWithQuantity } from "@/components/invoice/create";
import prisma from "@/lib/prisma";
import { CustomersFacturAPI } from "@/lib/types/facturapiTypes";
import facturaApiInstance from "@/services/config/facturaApi";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

interface RequestCreateInvoice {
    customer: CustomersFacturAPI
    items: ProductsWithQuantity[]
    payment_form: string
    use: string
}

export async function POST(req: any, res: Response) {
    try {
      const session = await getToken({ req });
      if (!session)
        return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
      const body: RequestCreateInvoice = await req.json();
      const newItems = body.items.map((item) => {
        const {quantity, ...result} = item
        return {
            quantity,
            product: item.id,
        }
      })
      
      const invoice = await facturaApiInstance.post(
        "invoices",
        {
          customer: body.customer.id,
          items: newItems,
          payment_form: body.payment_form,
          use: body.use
        },
        {
          headers: { Authorization: `Bearer ${session.data.facturapi_token}` },
        }
      );

      const createInvoice = await prisma.invoices.create({
        data: {
          facturapi_id: invoice.data.id,
          status: invoice.data.status,
          varification_url: invoice.data.varification_url,
          date: invoice.data.date,
          total: invoice.data.total,
          folio_number: invoice.data.folio_number,
          user_id: session.data.id
        },
      });
      await prisma.user_Organization.update({
        where: {
          id: session.data.id
        },
        data: {
          available_folios: {
            decrement: 1,
          },
        },
      });
      return NextResponse.json({
        status: 200,
        message: "ok",
        product: invoice.data,
      });
    } catch (error: any) {
        return error
      
     
    }
  }