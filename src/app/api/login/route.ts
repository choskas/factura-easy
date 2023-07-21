import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { GET_USER_BY_ID } from "@/lib/querys";
import * as bcrypt from "bcrypt";

interface RequestSignInBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RequestSignInBody = await req.json();

  const user = await prisma.user_Organization.findFirst({
    where: {
      email: body.email,
    },
    select: GET_USER_BY_ID
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...all } = user;
    const accessToken = signJwtAccessToken(all);
    const result = {
      ...all,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  }
}
