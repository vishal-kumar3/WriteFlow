import { auth } from '@/auth'
import Follower from '@/components/Friends/Follower'
import Following from '@/components/Friends/Following'
import FriendTabSwitcher from '@/components/Friends/FriendTabSwitcher'
import { redirect } from 'next/navigation'
import React from 'react'

type props = {
  params: {
    userId: string
  },
  searchParams: any
}

const page = async(params: props) => {
  const { userId } = params.params
  const session = await auth()

  if(!session) return null;

  if(session.user.id !== userId){
    redirect(`/user/${session.user.id}/friends`)
  }

  return (
    <div className='w-full md:w-[75%] mx-auto'>
      <div className='flex justify-center'>
        <FriendTabSwitcher Follower={<Follower id={userId} />} Following={<Following id={params.params.userId} />} />
      </div>
    </div>
  )
}

export default page
