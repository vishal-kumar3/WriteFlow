import { auth } from '@/auth';
import prisma from '@/prisma';
import React from 'react'
import SideBar from './Sidebar';
import { UserWithFollowers } from '@/types/UserType';
import LinkButton, { SideButton } from './LinkButton';
import { DefaultAvatarImage } from '@/app/(main)/user/[userId]/page';
import { ChartNoAxesCombinedIcon, Handshake, LogOut, Newspaper, Settings, UserSearch } from 'lucide-react';
import CreateFlowForm from '../form/CreateFlowForm';
import { signOut } from 'next-auth/react';

type props = {}

export const SidebarButtonsTop = ({user}: {user: UserWithFollowers}) => {
  return (
    <div className="flex flex-col gap-1">
      <LinkButton
        imageUrl={user?.image || DefaultAvatarImage}
        link={`/user/${user?.id}`}
      >{user?.name}</LinkButton>
      <LinkButton icon={<Newspaper />}>Feeds</LinkButton>
      <CreateFlowForm title="Create Flow" />
      <LinkButton icon={<Handshake />} link={`/user/${user?.id}/friends`}>Friends</LinkButton>
      <LinkButton icon={<UserSearch />} link="/user/search">Search User</LinkButton>
      <LinkButton link={`/user/dashboard`} icon={<ChartNoAxesCombinedIcon />}>Dashboard</LinkButton>
    </div>
  )
}

export const SidebarButtonBottom = () => {
  return (
    <div className="flex flex-col gap-1">
        <LinkButton icon={<Settings />}>Settings</LinkButton>
        <SideButton icon={<LogOut />} action={signOut}>Logout</SideButton>
      </div>
  )
}

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
    <div className='h-screen'>
      <SideBar user={user} />
    </div>
  )
}

export default ToggleSidebar
