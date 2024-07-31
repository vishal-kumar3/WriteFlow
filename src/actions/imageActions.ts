"use server"

import prisma from "@/prisma";
import { revalidatePath } from "next/cache";


export const updateUserCoverImage = async(coverImage: string, userId: string) => {
  console.log("coverImage", coverImage)
  if(!coverImage) return { error: 'No cover image provided' };

  const updatedCoverImage = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      coverImage
    }
  })

  if(!updatedCoverImage) return { error: 'Could not update cover image' };
  revalidatePath(`/user/${userId}`);
  return { success: 'Cover image updated successfully' };
}

export const updateUserAvatarImage = async(avatarImage: string, userId: string) => {
  console.log("AvatarImage", avatarImage)

  if(!avatarImage) return { error: 'No avatar image provided' };

  const updatedAvatarImage = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      image: avatarImage
    }
  })

  if(!updatedAvatarImage) return { error: 'Could not update avatar image' };
  revalidatePath(`/user/${userId}`);
  return { success: 'Avatar image updated successfully' };
}