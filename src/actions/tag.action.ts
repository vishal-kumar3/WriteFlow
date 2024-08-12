"use server"

import prisma from "@/prisma"


export const getAllTags = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      tag: true,
      postsCount: true,
    }
  })

  console.log(tags)
  return tags
}
