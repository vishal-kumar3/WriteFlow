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
    // async signIn({user}){
    //   console.log(user.id)
    //   const userExists = await getUserById(user.id!)

    //   if(!userExists){
    //     return false
    //   }
      

    //   return true
    // },

    async session({session, token}){
      console.log("session token", token)
      if(token.sub && session.user){
        session.user.id = token.sub
        session.user.role = token.role as Role
      }

      return session
    },

    async jwt({token}){
      if(!token.sub) return token

      const user = await getUserById(token.sub)

      if(!user) return token

      return { role:user.role, ...token }
    }
  },
  adapter: PrismaAdapter(prisma),
  session:{
    strategy: "jwt",
  },
  ...authConfig,
})
