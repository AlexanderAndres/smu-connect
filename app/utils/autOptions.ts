import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@prisma/client"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req): any {
        // Perform database operations
        if (
          credentials?.email === "admin@luks.dev" &&
          credentials?.password === "admin"
        ) {
          return {
            id: 1,
            userName: "admin",
            email: "admin@luks.dev",
          };
        }

        /*if (
          !credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique ({
          where: {
            email: credentials.email
          }
        });*/
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};
