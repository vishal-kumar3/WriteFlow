"use server"

import { auth } from "@/auth"
import { FlowData } from "@/components/Home/HomeFlows"
import prisma from "@/prisma"
import { revalidatePath } from "next/cache"

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

export const toggleBookmark = async (flowId: string) => {
  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      bookmarks: {
        select: {
          id: true
        }
      }
    }
  })

  if (!user) return { error: "User not found" }

  const isBookmarked = user.bookmarks.find((bookmark) => bookmark.id === flowId)

  if (isBookmarked) {
    const removedFromBookmark = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        bookmarks: {
          disconnect: {
            id: flowId
          }
        }
      }
    })

    if(!removedFromBookmark) return {error: "Unexpected error while removing bookmark!!!"}
    revalidatePath('/')
    return {success: "Bookmark removed!!!"}

  } else {
    const bookmarked = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        bookmarks: {
          connect: {
            id: flowId
          }
        }
      }
    })

    if(!bookmarked) return {error: "Unexpected error while bookmarking!!!"}
    revalidatePath('/')
    return {success: "Bookmarked!!!"}
  }
}

export const updateContent = async (flowId: string, userId:string, content: string) => {
  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  if(session.user.id !== userId) return {error: "Nope you can't do this here!!!"}

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false
    },
    data: {
      content
    }
  })

  if (!updatedFlow) {
    return { error: "Unexpected error while updating flow content!!!" }
  } else {
    return { success: "Flow content updated!!!" }
  }
}

export const updateTitle = async (flowId: string, userId: string, title: string) => {
  if(title === '') return

  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  if(session.user.id !== userId) return {error: "Nope you can't do this here!!!"}

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false
    },
    data: {
      title
    }
  })

  if (!updatedFlow) {
    return { error: "Unexpected error while updating flow title and description!!!" }
  } else {
    return { success: "Flow title and description updated!!!" }
  }
}

export const updateDescription = async (flowId: string, userId: string, description: string) => {
  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  if(session.user.id !== userId) return {error: "Nope you can't do this here!!!"}

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false
    },
    data: {
      description
    }
  })

  if (!updatedFlow) {
    return { error: "Unexpected error while updating flow description!!!" }
  } else {
    return { success: "Flow description updated!!!" }
  }
}

export const publishFlow = async (flowId: string, userId: string) => {
  const session = await auth()
  if (!session) return { error: "You are not logged in" }

  if(session.user.id !== userId) return {error: "Nope you can't do this here!!!"}

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false
    },
    data: {
      isPublished: true
    }
  })

  if (!updatedFlow) {
    return { error: "Unexpected error while publishing flow!!!" }
  } else {
    return { success: "Flow published!!!" }
  }
}
