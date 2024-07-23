"use server";

import { loginFormSchema, registerFormSchema } from "@/lib/schema";
import prisma from "@/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (data: z.infer<typeof loginFormSchema>) => {
  const validatedFields = loginFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    
    return { success: "Logged In Successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Error Type:- ",error.type)
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!!" };

        default:
          return { error: "Something went wrong!!" };
      }
    }

    throw error;
  }
};

export const register = async (data: z.infer<typeof registerFormSchema>) => {
  const validatedFields = loginFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return { error: "User Already Exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  if (!user) {
    return { error: "Error Creating User" };
  }

  // Todo: Send Email Verification

  return { success: `${name} has registered successfully` };
};
