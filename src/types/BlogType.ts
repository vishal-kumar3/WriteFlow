import { Prisma } from '@prisma/client';

export type Blog = Prisma.BlogGetPayload<{}> | null

export type BlogWithUserAndComments = Prisma.BlogGetPayload<{
  include: {
    user: true;
    Comment: {
      include: {
        user: true;
      };
    };
  };
}> | null

export type BlogWithTagsAndUser = Prisma.BlogGetPayload<{
  include: {
    user: true;
    tags: true;
  }
}> | null

export type BlogWithTagsAndUserAndComments = Prisma.BlogGetPayload<{
  include: {
    user: true;
    tags: true;
    Comment: {
      include: {
        user: true;
      };
    };
  };
}> | null

export type BlogWithTags = Prisma.BlogGetPayload<{
  include: {
    tags: true;
  },
}> | null

export type BlogWithUserAndTagsHome = Prisma.BlogGetPayload<{
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
      },
    },
    tags: {
      select: {
        tag: true
      }
    }
  }
}> | null
