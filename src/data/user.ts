import prisma from "@/prisma";




export const getUserByEmail = async (email: string) => {
  if(!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(!user) return null;

  return user;
}

export const getUserById = async (id: string) => {
  if(!id) return null;

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(!user) return null;

  return user;
}