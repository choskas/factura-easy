import RegisterForm from "@/components/register/RegisterForm";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestRegisterBody extends RegisterForm {}

export async function POST(req: Request) {
  try {
    const body: RequestRegisterBody = await req.json();

    const {
      email,
      password: newPassword,
      name,
      lastName,
      mothersName,
      address,
    } = body;
    if (!email || !newPassword || !name)
      return NextResponse.json(
        {
          message: "Faltan algunos datos",
        },
        {
          status: 400,
        }
      );
    const user = await prisma.user_Organization.create({
      data: {
        email,
        password: await bcrypt.hash(newPassword, 10),
        name,
        last_name: lastName,
        maternal_name: mothersName,
      },
    });

    const newAddress = await prisma.address.create({
      data: {
        ...address,
        user_id: user.id,
      },
    });

    const { password, ...result } = user;
    return NextResponse.json(
      {
        message: "Se ha registrado satisfactoriamente.",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return NextResponse.json(
            {
              message: "Ya existe un usuario con este email.",
            },
            {
              status: 400,
            }
          );
        }
    }
    NextResponse.json(
      {
        message: "Error de servidor",
      },
      {
        status: 500,
      }
    );
  }
}
