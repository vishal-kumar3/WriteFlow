"use server"
import { unstable_cache } from 'next/cache'
import { auth, signOut } from "@/auth"
import { changePasswordType, personalInfoType } from "@/components/form/AccountOnSubmit"
import prisma from "@/prisma"
import bcrypt from "bcryptjs";


export const personalInfoUpdate = async({ name, username, email, about }: personalInfoType) => {
  const session = await auth()
  if(!session) return { error: "You must be logged in to perform this action" }

  const updatedProfile = await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      name: name,
      username: username,
      email: email,
      about: {
        create: {
          career: about.career,
          bio: about.bio
        },
        update: {
          career: about.career,
          bio: about.bio
        }
      }
    }
  }).catch((e) => {
    console.log("error while updating profile:- ",e)
    return null
  })

  if(!updatedProfile) return { error: "An error occurred while updating your profile" }

  return { success: "Profile updated successfully" }
}

export const changePassword = async ({ currentPassword, newPassword }: changePasswordType) => {
  const session = await auth()
  if(!session) return { error: "You must be logged in to perform this action" }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  }).catch(() => null)

  if(!user) return { error: "User not found" }
  if(!user.password) return { error: "User does not have a password" }

  const newCurrentPassword = await bcrypt.hash(currentPassword, 10)
  console.log("current password hash:", newCurrentPassword);
  console.log("Stored Hashed Password:", user.password);

  const passwordMatch = await bcrypt.compare(currentPassword, user.password)
  console.log("Password Match:", passwordMatch);
  if(!passwordMatch) return { error: "Password is incorrect" }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const passUpdate = await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      password: hashedPassword
    }
  }).catch(() => {
    return null
  })

  if(!passUpdate) return { error: "An error occurred while updating your password" }

  return { success: "Password updated successfully" }
}

export const deleteAccount = async (password: string, confirm: boolean) => {
  if(!confirm) return { error: "You must confirm that you want to delete your account" }
  if(!password) return { error: "You must enter your password to delete your account" }
  console.log("Password:", password);
  console.log("Confirm:", confirm);
  const session = await auth()
  if(!session) return { error: "You must be logged in to perform this action" }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  }).catch(() => null)

  if(!user) return { error: "User not found" }
  if(!user.password) return { error: "User does not have a password" }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if(!passwordMatch) return { error: "Password is incorrect" }

  const deletedUser = await prisma.user.delete({
    where: {
      id: session.user.id
    }
  }).catch(() => null)

  if (!deletedUser) return {error: "An error occurred while deleting your account"}

  await signOut({
    redirect: true,
    redirectTo: "/auth/login"
  })

  return { success: "Account deleted successfully" }
}

export const editFlow = async (flowId: string, isPublished: boolean) => {
  if(!flowId) return { error: "You must provide a flow id to perform this action" }
  if(!isPublished) return { success: "Already Flow is a Draft." }
  
  const session = await auth()
  if(!session) return { error: "You must be logged in to perform this action" }

  const flow = await prisma.blog.update({
    where: {
      id: flowId,
      isPublished: true,
    },
    data: {
      isPublished: false
    }
  }).catch(() => null)

  if(!flow) return { error: "An error occurred while updating the flow" }

  return { success: "Flow updated successfully" }
}

export const cacheAuth = unstable_cache(async() => {
  const session = await auth()
  if(!session) return null;
  return session
}, ['auth'], {
  revalidate: 3600, tags: ['auth']
})
