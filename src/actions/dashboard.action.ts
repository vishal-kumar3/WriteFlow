"use server"

import { auth } from "@/auth"
import prisma from "@/prisma"


export const getSevenDaysViews = async (userId: string) => {
  const sevenDaysData = await prisma.view.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!sevenDaysData) return 0
  return sevenDaysData
}

export const getTotalViews = async (userId: string) => {
  const totalViews = await prisma.view.count({
    where: {
      userId,
    },
  })

  if (!totalViews) return 0
  return totalViews
}

export const getSevenDaysFollowers = async (userId: string) => {
  const totalFollowers = await prisma.follows.count({
    where: {
      followingId: userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!totalFollowers) return 0
  return totalFollowers
}

export const getRecentBlog = async (userId: string) => {
  const recentBlog = await prisma.blog.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 2
  })

  if (!recentBlog) return { error: "Error while fetching recent flows" }
  if (recentBlog.length === 0) return { error: "No recent flows found" }
  return { success: recentBlog }
}

export const getTotalFlowsAndFollowers = async (userId: string) => {

  // get total no of flows and followers
  const totalFlowsAndFollowers = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      _count: {
        select: {
          blogs: true,
        }
      },
      followerCount: true
    }
  })

  if (!totalFlowsAndFollowers) return {_count: {blogs: "_"}, followerCount: "_"}
  return totalFlowsAndFollowers
}
