'use server';

import { auth } from '@/auth';
import prisma from '@/prisma';
import { BlogWithUserAndTagsHome } from '@/types/BlogType';
import { revalidatePath } from 'next/cache';

export const deleteFlow = async (flowId: string) => {
  const session = await auth()
  if (!session) return { error: 'You are not logged in' }

  // const deletedFlow = await prisma.blog.delete({
  //   where: {
  //     id: flowId,
  //     userId: session.user.id
  //   }
  // }).catch((e) => {
  //   console.log("Error while deleting flow:- ",e)
  //   return null
  // })

  const deletedFlow = true;

  if (!deletedFlow) return { error: 'Unexpected error while deleting flow!!!' }
  revalidatePath('/')
  return { success: 'Flow deleted!!!' }
}

export const createFlow = async (initialState: any, formData: FormData) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const title = formData.get('title') as string;
  if (!title) return { error: 'Title is required' };

  const createdFlow = await prisma.blog.create({
    data: {
      title,
      user: {
        connect: {
          id: session.user.id!,
        },
      },
    },
  });

  if (!createdFlow) {
    return { error: 'Unexpected error while creating flow!!!' };
  } else {
    // redirect(`/blog/draft/${createdFlow.id}`);
    return {
      success: `${createdFlow.title} is created!!!`,
      id: createdFlow.id,
    };
  }
};

export const getFlowWithId = async (id: string) => {
  if (!id) return { error: 'Flow id is required' };

  const flow = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  if (!flow) {
    return { error: 'Flow not found' };
  } else {
    return { data: flow };
  }
};

export const getFlowForHome = async (filter: string = '') => {
  const session = await auth()
  let reportFilter: string[] = []

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        report: {
          select: {
            reportedBlogId: true
          }
        }
      }
    })

    user?.report.map((report) => {
      report.reportedBlogId && reportFilter.push(report.reportedBlogId)
    })
  }


  const flows: BlogWithUserAndTagsHome[] = await prisma.blog.findMany({
    where: {
      NOT: {
        id: {
          in: reportFilter
        }
      },
      isPublished: true,
      OR: [
        {
          title: {
            contains: filter,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filter,
            mode: 'insensitive',
          },
        },
        {
          user: {
            name: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        },
        {
          tags: {
            some: {
              tag: {
                contains: filter,
                mode: 'insensitive',
              },
            },
          },
        }
      ],
    },
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
    },
  });

  if (!flows) return { error: 'No flows found' };
  return { data: flows };
};

export const getDraftFlow = async (userId: string | undefined) => {
  if (!userId) return { error: 'User id is required' };
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  if (session.user.id !== userId)
    return { error: "Nope you can't do this here!!!" };

  const drafts = await prisma.blog.findMany({
    where: {
      userId: userId,
      isPublished: false,
    },
  });

  if (!drafts) return { error: 'No drafts found' };
  return { data: drafts };
};

export const toggleBookmark = async (flowId: string) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      bookmarks: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) return { error: 'User not found' };

  const isBookmarked = user.bookmarks.find(
    (bookmark) => bookmark.id === flowId
  );

  if (isBookmarked) {
    const removedFromBookmark = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bookmarks: {
          disconnect: {
            id: flowId,
          },
        },
      },
    });

    if (!removedFromBookmark)
      return { error: 'Unexpected error while removing bookmark!!!' };
    revalidatePath(`/user/${session.user.id}`);
    return { success: 'Bookmark removed!!!' };
  } else {
    const bookmarked = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        bookmarks: {
          connect: {
            id: flowId,
          },
        },
      },
    });

    if (!bookmarked) return { error: 'Unexpected error while bookmarking!!!' };
    revalidatePath(`/user/${session.user.id}`);
    return { success: 'Bookmarked!!!' };
  }
};

export const updateContent = async (
  flowId: string,
  userId: string,
  content: string
) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  if (session.user.id !== userId)
    return { error: "Nope you can't do this here!!!" };

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false,
    },
    data: {
      content,
    },
  });

  if (!updatedFlow) {
    return { error: 'Unexpected error while updating flow content!!!' };
  } else {
    return { success: 'Flow content updated!!!' };
  }
};

export const updateTitle = async (
  flowId: string,
  userId: string,
  title: string
) => {
  if (title === '') return;
  title = title.replace(/\s{2,}/g, ' ');

  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  if (session.user.id !== userId)
    return { error: "Nope you can't do this here!!!" };

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false,
    },
    data: {
      title,
    },
  });

  if (!updatedFlow) {
    return { error: 'Unexpected error while updating flow title!!!' };
  } else {
    revalidatePath(`/blog/draft/${flowId}`);
    return { success: 'Flow title updated!!!' };
  }
};

export const updateDescription = async (
  flowId: string,
  userId: string,
  description: string
) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  if (session.user.id !== userId)
    return { error: "Nope you can't do this here!!!" };

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false,
    },
    data: {
      description,
    },
  });

  if (!updatedFlow) {
    return { error: 'Unexpected error while updating flow description!!!' };
  } else {
    return { success: 'Flow description updated!!!' };
  }
};

export const publishFlow = async (
  flowId: string,
  userId: string,
  tags: string[],
  isCommentOff: boolean,
  slug: string
) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  if (session.user.id !== userId)
    return { error: "Nope you can't do this here!!!" };

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
      userId: session.user.id,
      isPublished: false,
    },
    data: {
      isPublished: true,
      isCommentOff,
      slug,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: {
            tag,
          },
          create: {
            tag,
          },
        })),
      },
    },
    include: {
      tags: true
    }
  });

  for (const tag of updatedFlow.tags) {
    await prisma.tag.update({
      where: {
        id: tag.id,
      },
      data: {
        postsCount: {
          increment: 1,
        },
      },
    });
  }

  if (!updatedFlow) {
    return { error: 'Unexpected error while publishing flow!!!' };
  } else {
    return { success: 'Flow published!!!', data: updatedFlow.id };
  }
};

// export const likeFlow = async (previousState: any, likeFlowData: { flowId: string, userId: string }) => {
export const likeFlow = async (flowId: string, userId: string) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  // const {flowId, userId} = likeFlowData

  const likeWhereUniqueInput = {
    userId_blogId: {
      userId: session.user.id!,
      blogId: flowId,
    },
  };

  const alreadyLiked = await prisma.blogLike.findUnique({
    where: likeWhereUniqueInput,
  });

  if (alreadyLiked) {
    const unLike = await prisma.$transaction([
      prisma.blogLike.delete({
        where: likeWhereUniqueInput,
      }),
      prisma.blog.update({
        where: {
          id: flowId,
          isPublished: true,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    if (!unLike) return { error: 'Unexpected error while unliking flow!!!' };
    // revalidatePath(`/blog/${flowId}`);
    revalidatePath(`/user/${session.user.id}`);
    return { success: 'Flow unliked!!!' };
  } else {
    const like = await prisma.$transaction([
      prisma.blogLike.create({
        data: {
          blogId: flowId,
          userId: session.user.id!,
        },
      }),
      prisma.blog.update({
        where: {
          id: flowId,
          isPublished: true,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      }),
    ]);

    if (!like) return { error: 'Unexpected error while liking flow!!!' };
    // revalidatePath(`/blog/${flowId}`);
    revalidatePath(`/user/${session.user.id}`);
    return { success: 'Flow liked!!!' };
  }
};

export const isAlreadyViewed = async (flowId: string, userId: string) => {
  const alreadyViewed = await prisma.view.findMany({
    where: {
      userId: userId,
      blogId: flowId,
    },
  })

  if (alreadyViewed.length >= 1) return { data: true };
  else return { data: false };
}

export const viewFlow = async (flowId: string) => {
  if (!flowId) return { error: 'Flow Id is required' };
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const { data } = await isAlreadyViewed(flowId, session.user.id!);

  if (data) return { success: 'Already viewed' };
  const view = prisma.$transaction([
    prisma.view.create({
      data: {
        userId: session.user.id!,
        blogId: flowId,
      }
    }),
    prisma.blog.update({
      where: {
        id: flowId,
      },
      data: {
        noOfViews: {
          increment: 1,
        }
      }
    })
  ])

  if (!view) return { error: 'Unexpected error while viewing flow!!!' };
  revalidatePath(`/user/${session.user.id}`);
  return { success: 'Flow viewed!!!' };
}

export const isBookmarked = async (flowId: string) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      bookmarks: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) return { error: 'User not found' };

  const isBookmarked = user.bookmarks.find(
    (bookmark) => bookmark.id === flowId
  );

  if (isBookmarked) return { data: true };
  else return { data: false };
};

export const commentFlow = async (formData: FormData) => {
  const content = formData.get('content') as string;
  const flowId = formData.get('flowId') as string;
  const parentId = formData.get('parentId') as string | null;

  if (!flowId) return { error: 'Flow Post Id Is Required' };
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const createdComment = await prisma.blog.update({
    where: {
      id: flowId,
    },
    data: {
      Comment: {
        create: {
          content,
          userId: session.user.id!,
          parentId,
        },
      },
      noOfComments: {
        increment: 1,
      }
    },
  })

  if (!createdComment)
    return { error: 'Unexpected error while commenting flow!!!' };
  revalidatePath(`/blog/${flowId}`);
  return { success: 'Commented!!!' };
};

export const alreadyLikedComment = async (commentId: string) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const likeWhereUniqueInput = {
    userId_commentId: {
      userId: session.user.id!,
      commentId: commentId,
    },
  };

  const alreadyLiked = await prisma.commentLike.findUnique({
    where: likeWhereUniqueInput,
  });

  if (alreadyLiked) return { data: true };
  else return { data: false };
};

export const likeComment = async (flowId: string, commentId: string) => {
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const likeWhereUniqueInput = {
    userId_commentId: {
      userId: session.user.id!,
      commentId: commentId,
    },
  };

  const alreadyLiked = await prisma.commentLike.findUnique({
    where: likeWhereUniqueInput,
  });

  if (alreadyLiked) {
    const unLike = await prisma.$transaction([
      prisma.commentLike.delete({
        where: likeWhereUniqueInput,
      }),
      prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    if (!unLike) return { error: 'Unexpected error while unliking flow!!!' };
    revalidatePath(`/blog/${flowId}`);
    return { success: 'Flow unliked!!!', data: false };
  } else {
    const like = await prisma.$transaction([
      prisma.commentLike.create({
        data: {
          commentId: commentId,
          userId: session.user.id!,
        },
      }),
      prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      }),
    ]);

    if (!like) return { error: 'Unexpected error while liking flow!!!' };
    revalidatePath(`/blog/${flowId}`);
    return { success: 'Flow liked!!!', data: true };
  }
};

export const getComments = async (flowId: string) => {
  if (!flowId) return { error: 'Flow Post Id Is Required' };

  const comments = await prisma.comment.findMany({
    where: {
      blogId: flowId,
    },
    include: {
      user: true,
    }
  });

  if (!comments) return { error: 'No comments found' };
  return { data: comments };
};

export const deleteComment = async (commentId: string, flowId: string) => {
  if (!commentId) return { error: 'Comment Id Is Required' };
  const session = await auth();
  if (!session) return { error: 'You are not logged in' };

  const deletedComment = await prisma.comment.deleteMany({
    where: {
      id: commentId,
      userId: session.user.id,
    },
  });

  const updatedFlow = await prisma.blog.update({
    where: {
      id: flowId,
    },
    data: {
      noOfComments: {
        decrement: 1,
      }
    },
  })

  if (deletedComment.count === 0)
    return { error: "You can't delete this comment!!!" };
  revalidatePath(`/blog/${flowId}`);
  return { success: 'Comment deleted!!!' };
};
