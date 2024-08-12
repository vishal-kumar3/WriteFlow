import { Prisma } from '@prisma/client';

export type HistoryWithBlog = Prisma.ViewGetPayload<{
  select: {
    blog: true,
  }
}> | null
