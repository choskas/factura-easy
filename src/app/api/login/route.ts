
import { signJwtAccessToken } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcrypt'

interface RequestSignInBody {
    email: string
    password: string
}

export async function POST(req: Request) {
 const body: RequestSignInBody = await req.json()
 
 const user = await prisma.user_Organization.findFirst({
    where: {
        email: body.email
    },
    select: {
        id: true,
        facturapi_id: true,
        api_token: true,
        name: true,
        maternal_name: true,
        last_name: true,
        rfc: true,
        email: true,
        emailVerified: true,
        image: true,
        address: {
          select: {
            street: true,
            exterior: true,
            interior: true,
            neighborhood: true,
            city: true,
            municipality: true,
            zip: true,
            state: true,
            country: true,
          },
        },
        password: true,
      },
 })

 if (user && await(bcrypt.compare(body.password, user.password))){
    
    const {password, ...all} = user
    const accessToken = signJwtAccessToken(all)
    const result = {
        ...all,
        accessToken
    }
    return new Response(JSON.stringify(result))
 }
}