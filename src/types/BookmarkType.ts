import { Prisma } from '@prisma/client';

export type UserWithBookmark = Prisma.UserGetPayload<{
  select: {
    bookmarks: true,
  }
}> | null
