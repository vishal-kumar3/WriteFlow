import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession["user"] & {
  role?: Role
  username?: string
}


declare module "next-auth" {
  interface User {
    id: string;
    username?: string; // Add the username field to the User type
    role?: string;

  }
  interface Session {
    user: ExtendedUser;
  }
}
