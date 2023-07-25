
import { withAuth } from "next-auth/middleware"
//@ts-ignore
import { Status } from "./lib/types/next-auth.d.ts";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers.js";

const PROTECTED_ROUTES = ["/dashboard", "/customer", "/product"]

export default withAuth(
  async function middleware(req: NextRequest) {
    const session = await getToken({req})

    if (!session) return  NextResponse.redirect(new URL('/', req.url))
    if (PROTECTED_ROUTES.some(route => req.url.includes(route)) && session?.data.status === Status.IN_VALIDATION){
      return NextResponse.redirect(new URL('/register/completed', req.url))
    }

    if (PROTECTED_ROUTES.some(route => req.url.includes(route)) && session?.data.status === Status.VALIDATED){
      
      return NextResponse.next()
    }

  return NextResponse.next()
  },
  // {
  //   callbacks: {
  //     authorized: ({ token }) => {
  //       if (isValidStatus(token ? token.data.status : '')) return true
  //       return false
        
  //     },
  //   },
  // }
)

export const config = { matcher: ["/dashboard", "/customer", "/product"] }