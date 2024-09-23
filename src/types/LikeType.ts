import { Prisma } from '@prisma/client';

export type Like = Prisma.BlogLikeGetPayload<{}> | null

export type LikedFlowWithTagsAndUser = Prisma.BlogLikeGetPayload<{
  include: {
    blog: {
      include: {
        tags: true,
        user: true
      }
    }
  }
}> | null
