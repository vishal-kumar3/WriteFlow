import RightSidebar from '@/components/RightSidebar/RightSidebar'
import SearchUser from '@/components/SearchUser/SearchUser'
import AuthUserOnly from '@/util/AuthUserOnly'
import React from 'react'

type props = {}

const page = (props: props) => {

  return (
    <div className='w-full mx-auto'>
      <div className='flex justify-center'>
        <SearchUser />

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
