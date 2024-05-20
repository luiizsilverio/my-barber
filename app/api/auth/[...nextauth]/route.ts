import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { db } from "@/app/_lib/prisma";

export type TUser = {
  id: string;
  name: string;
  email: string;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  // o código abaixo disponibiliza o Id do usuário
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as TUser;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }