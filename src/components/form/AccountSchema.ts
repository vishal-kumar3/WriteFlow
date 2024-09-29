"use client"

import { z } from "zod"
import { FieldDefinition } from "./DynamicForm"


export const PersonalInfoSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.optional(z.string().email({ message: 'Enter a valid email' })),
  career: z.string().min(3, { message: 'Carrer must be at least 3 characters' }),
  bio: z.string().min(3, { message: 'Bio must be at least 3 characters' }),
})

export const PersonalInfoUpdate: FieldDefinition[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: "Enter your name",
    type: "text"
  },
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
  },
  // {
  //   name: 'email',
  //   label: 'Email',
  //   placeholder: 'Email',
  //   type: 'email',
  // },
  {
    name: 'career',
    label: 'Career',
    placeholder: 'Career',
    type: 'text',
  },
  {
    name: 'bio',
    label: 'Bio',
    placeholder: 'Bio',
    type: 'text',
  },
]

export const setPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const PasswordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  newPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const SetPassword: FieldDefinition[] = [
  {
    name: 'password',
    label: 'Set Password',
    placeholder: 'Set New Password...',
    type: 'password',
  }
]

export const PasswordUpdate: FieldDefinition[] = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    placeholder: 'Current Password',
    type: 'password',
  },
  {
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'New Password',
    type: 'password',
  }
]

export const ForgetPassword = [

]

export const DeleteAccount = [

]
