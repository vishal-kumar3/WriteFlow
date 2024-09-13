import Follower from '@/components/Friends/Follower'
import Following from '@/components/Friends/Following'
import FriendTabSwitcher from '@/components/Friends/FriendTabSwitcher'
import React from 'react'

type props = {
  params: {
    userId: string
  },
  searchParams: any
}

const page = async(params: props) => {
  return (
    <div className='w-[75%] mx-auto'>
      <div className='flex justify-center'>
        <FriendTabSwitcher Follower={<Follower id={params.params.userId} />} Following={<Following id={params.params.userId} />} />
      </div>
    </div>
  )
}

export default page
