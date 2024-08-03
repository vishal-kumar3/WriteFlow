"use server"

import { auth } from "@/auth"
import { FlowData } from "@/components/Home/HomeFlows"
import prisma from "@/prisma"

export const createFlow = async (formData: FormData) => {

  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  const title = formData.get("title") as string
  if (!title) return { error: "Title is required" }

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

  if (!createdFlow) {
    return { error: "Unexpected error while creating flow!!!" }
  } else {
    return { success: `${createdFlow.title} is created!!!`, id: createdFlow.id }
  }
}

export const getFlowWithId = async (id: string) => {
  if (!id) return { error: "Flow id is required" }

  const flow = await prisma.blog.findUnique({
    where: {
      id: id
    }
  })

  if (!flow) {
    return { error: "Flow not found" }
  } else {
    return { data: flow }
  }
}

export const getFlowForHome = async (filter: string = '') => {

  const flows: FlowData[] = await prisma.blog.findMany({
    where: {
      isPublished: true,
      OR: [
        {
          title: {
            contains: filter,
            mode: 'insensitive',
          },
        },
        {
          description: {
        contains: filter,
        mode: 'insensitive',
      },
        },
        {
          user: {
            name: {
              contains: filter,
              mode: 'insensitive'
            }
          }
        }
      ]
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        }
      }
    }
  })

  if (!flows) return { error: "No flows found" }
  return { data: flows }
}

export const getDraftFlow = async (userId: string | undefined) => {
  if (!userId) return { error: "User id is required" }
  const session = await auth()
  if(!session) return {error: "You are not logged in"}

  if(session.user.id !== userId) return {error: "Nope you can't do this here!!!"}

  const drafts = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: false
    }
  })

  if (!drafts) return { error: "No drafts found" }
  return { data: drafts }
}
