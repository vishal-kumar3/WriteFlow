"use server"

import prisma from "@/prisma"
import { BlogWithTagsAndUser } from "@/types/BlogType"
import { UserWithBookmarkAndUserAndTags } from "@/types/BookmarkType"
import { LikedFlowWithTagsAndUser } from "@/types/LikeType"
import { HistoryWithBlogAndUser } from "@/types/ViewType"


export const getHistoryData = async (userId: string) => {
  const HistoryData: HistoryWithBlogAndUser[] = await prisma.view.findMany({
    where: {
      userId: userId,
    },
    include: {
      blog: {
        include: {
          user: true,
          tags: true
        }
      },
    }
  }).catch(() => {
    return []
  })

  return HistoryData
}

export const getBookmarkData = async (userId: string) => {
  const BookmarkData: UserWithBookmarkAndUserAndTags = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      bookmarks: {
        include: {
          user: true,
          tags: true
        }
      }
    }
  })

  return BookmarkData
}

export const getLikedData = async (userId: string) => {
  const LikedFlowData: LikedFlowWithTagsAndUser[] = await prisma.blogLike.findMany({
    where: {
      userId: userId
    },
    include: {
      blog: {
        include: {
          tags: true,
          user: true,
        },
      },
    }
  }).catch(() => [])

  return LikedFlowData
}

export const getPublishedData = async (userId: string) => {
  const PublishedFlowData: BlogWithTagsAndUser[] = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: true
    },
    include: {
      user: true,
      tags: true
    }
  }).catch(() => [])

  return PublishedFlowData
}

export const getDraftData = async (userId: string) => {
  const DraftFlowData: BlogWithTagsAndUser[] = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: false
    },
    include: {
      tags: true,
      user: true
    }
  }).catch(() => [])

  return DraftFlowData
}
