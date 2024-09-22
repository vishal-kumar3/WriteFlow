"use server"

import prisma from "@/prisma"
import { BlogWithTags } from "@/types/BlogType"
import { UserWithBookmark } from "@/types/BookmarkType"
import { LikedFlowWithTags } from "@/types/LikeType"
import { HistoryWithBlog } from "@/types/ViewType"


export const getHistoryData = async (userId: string) => {
  const HistoryData: HistoryWithBlog[] = await prisma.view.findMany({
    where: {
      userId: userId,
    },
    select: {
      blog: true
    }
  }).catch(() => {
    return []
  })

  return HistoryData
}

export const getBookmarkData = async (userId: string) => {
  const BookmarkData: UserWithBookmark = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      bookmarks: true,
    }
  })

  return BookmarkData
}

export const getLikedData = async (userId: string) => {
  const LikedFlowData: LikedFlowWithTags[] = await prisma.blogLike.findMany({
    where: {
      userId: userId
    },
    include: {
      blog: {
        include: {
          tags: true,
        },
      },
    }
  }).catch(() => [])

  return LikedFlowData
}

export const getPublishedData = async (userId: string) => {
  const PublishedFlowData: BlogWithTags[] = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: true
    },
    include: {
      tags: true
    }
  }).catch(() => [])

  return PublishedFlowData
}

export const getDraftData = async (userId: string) => {
  const DraftFlowData: BlogWithTags[] = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: false
    },
    include: {
      tags: true
    }
  }).catch(() => [])

  return DraftFlowData
}
