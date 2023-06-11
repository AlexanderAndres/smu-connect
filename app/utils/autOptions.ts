import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Perform database operations
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        });
        if (!user || !user?.password) {
          throw new Error('Invalid Credentials');
        }
        /*const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }*/
        if (user.email !== credentials.email && user.password !== credentials.password){
          throw new Error('Invalid Credentials');
        }

        return user as any;
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
