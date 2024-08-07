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
  title = title.replace(/\s{2,}/g, ' ')

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
    return { error: "Unexpected error while updating flow title!!!" }
  } else {
    revalidatePath(`/blog/draft/${flowId}`)
    return { success: "Flow title updated!!!" }
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

export const publishFlow = async (
  flowId: string,
  userId: string,
  tags: string[],
  isCommentOff: boolean,
  slug: string
) => {
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
      isPublished: true,
      isCommentOff,
      slug,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: {
            tag
          },
          create: {
            tag
          }
        }))
      }
    }
  })


  if (!updatedFlow) {
    return { error: "Unexpected error while publishing flow!!!" }
  } else {
    return { success: "Flow published!!!", data: updatedFlow.id }
  }
}

export const likeFlow = async (flowId: string, userId: string) => {
  const session = await auth()
  if(!session) return {error: "You are not logged in"}

  const likeWhereUniqueInput = {
		userId_blogId_commentId: {
			userId: session.user.id!,
			blogId: flowId,
			commentId: null,
		},
	};

  const alreadyLiked = await prisma.like.findUnique({
    where: likeWhereUniqueInput
  })

  if(alreadyLiked) {
    const unLike = await prisma.$transaction([
			prisma.like.delete({
				where: {
					blogId: flowId,
					userId: session.user.id,
				},
			}),
			prisma.blog.update({
				where: {
					id: flowId,
					isPublished: true,
				},
				data: {
					likeCount: {
						decrement: 1,
					},
				},
			}),
		]);

    if(!unLike) return {error: "Unexpected error while unliking flow!!!"}
    revalidatePath(`/blog/${flowId}`)
    return {success: "Flow unliked!!!"}
  } else {
    const like = await prisma.$transaction([
			prisma.like.create({
				data: {
					blogId: flowId,
					userId: session.user.id,
				},
			}),
			prisma.blog.update({
				where: {
					id: flowId,
					isPublished: true,
				},
				data: {
					likeCount: {
						increment: 1,
					},
				},
			}),
		]);

    if(!like) return {error: "Unexpected error while liking flow!!!"}
    revalidatePath(`/blog/${flowId}`)
    return {success: "Flow liked!!!"}
  }
}

export const isBookmarked = async (flowId: string) => {
  const session = await auth()
  if(!session) return {error: "You are not logged in"}

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

  if(!user) return {error: "User not found"}

  const isBookmarked = user.bookmarks.find((bookmark) => bookmark.id === flowId)

  if(isBookmarked) return {data: true}
  else return {data: false}
}
