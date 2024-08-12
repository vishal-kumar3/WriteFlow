import { Prisma } from '@prisma/client';

export type Comment = Prisma.CommentGetPayload<{}> | null

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: true,
  }
}> | null
