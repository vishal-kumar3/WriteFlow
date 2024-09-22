import { Prisma } from '@prisma/client';

export type Like = Prisma.BlogLikeGetPayload<{}> | null

export type LikedFlowWithTags = Prisma.BlogLikeGetPayload<{
  include: {
    blog: {
      include: {
        tags: true
      }
    }
  }
}> | null
