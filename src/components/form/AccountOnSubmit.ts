"use client"
import { z } from "zod"
import { PasswordSchema, PersonalInfoSchema } from "./AccountSchema"
import { changePassword, personalInfoUpdate } from "@/actions/settings.action"
import { toast } from "sonner"

export type personalInfoType = {
  name: string
  username: string
  email: string
  about: {
    career: string
    bio: string
  }
}

export const onSubmitPersonalInfo = async (data: z.infer<typeof PersonalInfoSchema>) => {
  const values = {
    name: data.name,
    username: data.username,
    email: data.email,
    about: {
      career: data.career,
      bio: data.bio
    }
  }

  const { error, success } = await personalInfoUpdate(values);

  if(error){
    toast.error(error)
  }else {
    toast.success(success)
  }
}

export type changePasswordType = {
  currentPassword: string
  newPassword: string
}

export const onSubmitChangePassword = async (data: z.infer<typeof PasswordSchema>) => {
  const values: changePasswordType = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword
  }

  const { error, success } = await changePassword(values);

  if (error) {
    toast.error(error)
  } else {
    toast.success(success)
  }
}
