"use server";

import { auth } from "@/auth";
import prisma from "@/prisma";
import { User } from "@/types/UserType";
import { revalidatePath } from "next/cache";

export type UserAbout = {
  userId: string;
  bio: string;
  location: string;
  website: string;
  career: string;
};

export const getFollowingUsers = async (userId: string) => {
  const followingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return followingUser
}

export const isAlreadyFollowing = async(id: string) => {
  const session = await auth()
  if(!session?.user?.id) return { error: 'No user id provided' };

  const currentUserId: string = session.user.id

  if(!id) return { error: "invalid user Id"}

  const alreadyFollowing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: id
      }
    }
  })

  if(alreadyFollowing){
    return { data: true }
  }
  return { data: false }
}

export const updateUserAboutSection = async (initialState: any, formData: FormData) => {

  const session = await auth()
  if(!session?.user?.id) return { error: 'No user id provided' };

  const userId = session.user.id as string;

  const name = formData.get('name') as string
  const bio = formData.get('bio') as string;
  const location = formData.get('location') as string;
  const website = formData.get('website') as string;
  const career = formData.get('career') as string;

  if([name, bio, location, website, career].some((field) => !field)) {
    return { error: 'All fields are required' };
  }

  const UserNameUpdate = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      name
    }
  })

  const UserAbout = await prisma.about.upsert({
    where: {
      userId: session?.user?.id
    },
    update: {
      bio,
      location,
      website,
      career
    },
    create:{
      bio,
      location,
      website,
      career,
      userId
    }
  })

  if(!UserAbout || !UserNameUpdate) return { error: 'Could not update user about section' };
  revalidatePath(`/user/${userId}`);
  return { success: 'User about section updated successfully' };
};

export const followToggle = async(id: string) => {
  const session = await auth()
  if(!session?.user?.id) return { error: 'No user id provided' };

  const currentUserId: string = session.user.id

  if(!id) return { error: "invalid user Id"}

  if(currentUserId === id) return {error: "You can not follow Yourself!!"}

  const alreadyFollowing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: id
      }
    }
  })

  if(alreadyFollowing){
    const unfollow = await prisma.$transaction([
      prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: id
          }
        }
      }),
      prisma.user.update({
        where: {
          id: currentUserId,
        },
        data: {
          followingCount: {
            decrement: 1
          }
        }
      }),
      prisma.user.update({
        where: {
          id: id
        },
        data: {
          followerCount: {
            decrement: 1
          }
        }
      })
    ])

    if(!unfollow) return { error: 'Could not unfollow user' };
    revalidatePath(`/user/${id}`);
    return { success: 'User unfollowed successfully', data: false };
  }
  else {
    const follow = await prisma.$transaction([
      prisma.follows.create({
        data: {
          followerId: currentUserId,
          followingId: id
        }
      }),
      prisma.user.update({
        where: {
          id: currentUserId,
        },
        data: {
          followingCount: {
            increment: 1
          }
        }
      }),
      prisma.user.update({
        where: {
          id: id
        },
        data: {
          followerCount: {
            increment: 1
          }
        }
      })
    ])

    if(!follow) return { error: 'Could not follow user' };
    revalidatePath(`/user/${id}`);
    return { success: 'User followed successfully', data: true };
  }
}


export const getFollowers = async(id: string) => {
  const followers = await prisma.follows.findMany({
    where: {
      followingId: id
    },
    include: {
      follower: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if(!followers) return { error: 'Could not get followers' };
  return { data: followers }
}

export const getFollowing = async(id: string) => {
  const following = await prisma.follows.findMany({
    where: {
      followerId: id
    },
    include: {
      following: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if(!following) return { error: 'Could not get following' };
  return { data: following }
}

// TODO: pagination
export const getTopUsers = async(filter: string = '') => {

  const users: User[] = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: filter,
            mode: 'insensitive'
          }
        },
        {
          username: {
            contains: filter,
            mode: 'insensitive'
          }
        }
      ]
    },
    orderBy: {
      followerCount: 'desc'
    },
    take: 5
  })

  if(!users) return { error: 'Could not get top users' };
  return { data: users }
}
