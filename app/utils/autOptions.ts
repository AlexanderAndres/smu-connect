import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
        return null;
      },
    }),
  ],
};
