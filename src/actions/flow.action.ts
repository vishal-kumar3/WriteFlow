"use server"

import { auth } from "@/auth"
import prisma from "@/prisma"
import { redirect } from "next/navigation"

export const createFlow = async (formData: FormData) => {

  const session = await auth()
  if(!session) return { error: "You are not logged in" }

  const title = formData.get("title") as string
  if(!title) return { error: "Title is required" }

  const createdFlow = await prisma.blog.create({
    data: {
      title,
      user: {
        connect: {
          id: session.user.id!
        }
      }
    },
  })

  if(!createdFlow){
    return { error: "Unexpected error while creating flow!!!"}
  } else {
    return {success: `${createdFlow.title} is created!!!`, id: createdFlow.id}
  }
}



