import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession["user"] & {
  role: Role
}


declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
