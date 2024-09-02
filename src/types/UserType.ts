import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{}> | null

export type FlowUser = Prisma.UserGetPayload<{
  select : {
    id: true,
    name: true,
    email: true,
    image: true,
    username: true
  }
}> | null

export type UserWithBookmarkId = Prisma.UserGetPayload<{
  include: {
    bookmarks: {
      select: {
        id: true
      }
    }
  }
}> | null

export type UserWithFlowsAndTagsAndAbout = Prisma.UserGetPayload<{
  include: {
    blogs: {
      include: {
        tags: true
      }
    },
    about: true
  }
}> | null

export type UserWithFollowers = Prisma.UserGetPayload<{
  include: {
    followers: {
      select: {
        followingId: true
      }
    }
  }
}> | null
