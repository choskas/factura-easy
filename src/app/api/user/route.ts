
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestRegisterBody {
    email: string
    password: string
}

export async function POST(req: Request) {
 const body: RequestRegisterBody = await req.json()
 
 const user = await prisma.user_Organization.create({
    data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10)
    }
 })

const {password, ...result} = user
return new Response(JSON.stringify(result))
}