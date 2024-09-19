import React from 'react'
import SearchUserCard from './SearchUserCard'
import { getFollowers } from '@/actions/user.action'

type props = {
  id: string
}

const Follower = async ({id}: props) => {

  const {error, data} = await getFollowers(id)

  return (
    <div className='flex w-full flex-col gap-4'>
      {
        data?.map(({follower}, key) => (
          <SearchUserCard userData={follower} key={key} />
        ))
      }
    </div>
  )
}

export default Follower
