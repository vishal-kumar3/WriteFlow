import { Prisma } from '@prisma/client';

export type Like = Prisma.BlogLikeGetPayload<{}> | null
