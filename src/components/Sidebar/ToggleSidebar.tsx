import { auth } from '@/auth';
import prisma from '@/prisma';
import React from 'react'
import SideBar from './Sidebar';

type props = {}

const ToggleSidebar = async (props: props) => {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      followers: {
        select: {
          followingId: true,
        }
      }
    }
  })

  return (
    <SideBar user={user} />
  )
}

export default ToggleSidebar
