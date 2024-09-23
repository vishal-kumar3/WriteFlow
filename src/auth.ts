import NextAuth from "next-auth"
import authConfig from "./auth.config"
import prisma from "./prisma"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
import { Role } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}){
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    async session({session, token}){
      if(token.sub && session.user){
        session.user.id = token.sub
        session.user.role = token.role as Role
        session.user.username = token.username as string
      }

      return session
    },

    async jwt({token}){
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;

      token.username = user.username;  // Store username in token
      token.role = user.role;
      return token;
    },

    async signIn({user, account, profile, email, credentials}){
      if (!user.username) {
        let username = `${user.name?.split(" ").join("").toLowerCase()}_${Math.floor(1000 + Math.random() * 9000)}`

        // Ensure username is unique
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          username += Math.floor(Math.random() * 1000);
        }

        user.username = username;  // Now user has a username
      }
      return true;
    }

  },
  adapter: PrismaAdapter(prisma),
  session:{
    strategy: "jwt",
  },
  ...authConfig,
})
