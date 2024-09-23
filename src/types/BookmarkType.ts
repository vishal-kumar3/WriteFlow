import { Prisma } from '@prisma/client';

export type UserWithBookmarkAndUserAndTags = Prisma.UserGetPayload<{
  include: {
    bookmarks: {
      include: {
        user: true,
        tags: true
      }
    },
  }
}> | null
