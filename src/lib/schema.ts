import { z } from "zod";


export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})
