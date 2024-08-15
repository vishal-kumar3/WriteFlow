import Follower from '@/components/Friends/Follower'
import Following from '@/components/Friends/Following'
import FriendTabSwitcher from '@/components/Friends/FriendTabSwitcher'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import AuthUserOnly from '@/util/AuthUserOnly'
import React from 'react'

type props = {
  params: {
    userId: string
  },
  searchParams: any
}

const page = async(params: props) => {
  console.log(params.params.userId)
  return (
    <div className='w-full mx-auto'>
      <div className='flex justify-center'>
        <FriendTabSwitcher Follower={<Follower id={params.params.userId} />} Following={<Following id={params.params.userId} />} />
        {/* @ts-expect-error Async Server Component */}
        <AuthUserOnly>
          {/* @ts-expect-error Async Server Component */}
          <RightSidebar />
        </AuthUserOnly>
      </div>
    </div>
  )
}

export default page
