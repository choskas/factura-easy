import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import axios from "axios";

export default NextAuth({
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      // The name to display on the sign-in form (e.g., 'Sign in with Email')
      name: "Credentials",
      // The credentials-based authentication callback function
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        try {
          const res = await axios.post("http://localhost:3000/api/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = await res.data;
        
          if (user) return user;
          return null;
        } catch (error) {}
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      const {name, email, picture, sub, ...result} = token
      if (user) {
        // @ts-ignore
        result.data = user;
      }
      if (trigger === "update") {
        // const response = await getUserSessionDataSSR({ id: token.user.slug, token: token.user.token })
        // token.user = response
      }
      return result
    },
    session: async ({ session, token }: any) => {

      session = token.data;
      return session
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  site: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
  },
});
