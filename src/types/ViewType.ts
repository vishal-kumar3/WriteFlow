import { Prisma } from '@prisma/client';

export type HistoryWithBlogAndUser = Prisma.ViewGetPayload<{
  include: {
    blog: {
      include: {
        user: true,
      }
    },
  }
}> | null
