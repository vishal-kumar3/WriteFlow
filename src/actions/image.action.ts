"use server"
import { uploadFile } from '@uploadcare/upload-client'
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";


export const updateUserCoverImage = async(coverImage: string, userId: string) => {
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

export const updateFlowCoverImage = async(coverImage: string, flowId: string) => {
  if(!coverImage) return { error: 'No cover image provided' };

  const updatedCoverImage = await prisma.blog.update({
    where: {
      id: flowId,
      isPublished: false,
    },
    data: {
      coverImage
    }
  })

  if(!updatedCoverImage) return { error: 'Could not update cover image' };
  revalidatePath(`/blog/draft/${flowId}`);
  return { success: 'Cover image updated successfully' };
}

export const updateFlowThumbnailImage = async(thumbnailImage: string, flowId: string) => {
  if(!thumbnailImage) return { error: 'No thumbnail image provided' };

  const updatedThumbnailImage = await prisma.blog.update({
    where: {
      id: flowId,
      isPublished: false,
    },
    data: {
      thumbnail: thumbnailImage
    }
  })

  if(!updatedThumbnailImage) return { error: 'Could not update thumbnail image' };
  revalidatePath(`/blog/draft/${flowId}`);
  return { success: 'Thumbnail image updated successfully' };
}

export async function uploadImage(file: File) {
  // Ensure it's a client-side operation
  if (typeof window === 'undefined') {
    return { error: 'File uploads should happen on the client side.' };
  }

  if (!(file instanceof File)) {
    return { error: 'Invalid file type, expected File.' };
  }

  try {
    const result = await uploadFile(file, {
      publicKey: '511e1df4c0a33fe1a180', // Replace with your actual public key
      store: 'auto',
      metadata: {
        subsystem: 'uploader',
        pet: 'cat',
      },
    });

    return { success: result.cdnUrl };
  } catch (error) {
    console.error('Upload error in function:', error);
    return { error: 'There was a problem uploading your image, please try again.' };
  }
}
