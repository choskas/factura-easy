import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: any, res: Response) {
  const session = await getToken({ req });
  if (!session)
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  const users = await prisma.user_Organization.findMany();
  return NextResponse.json({ users });
}
