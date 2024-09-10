import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginFormSchema } from "./lib/schema";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";


export default {
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),

  Credentials({
    async authorize(credentials) {
      const validatedFields = loginFormSchema.safeParse(credentials);

      if (!validatedFields.success) {
        return null;
      }

      const { email, password } = validatedFields.data;

      const user = await getUserByEmail(email);
      if (!user || !user.password) return null;

      const isPasswordCorrect = compare(password, user.password!);
      if (!isPasswordCorrect) return null;

      return user;
    }
  })
  ],
} satisfies NextAuthConfig
