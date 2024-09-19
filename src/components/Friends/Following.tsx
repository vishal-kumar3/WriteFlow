import React from 'react'
import SearchUserCard from './SearchUserCard'
import { getFollowing } from '@/actions/user.action'

type props = {
  id: string
}

const Following = async({id}: props) => {

  const {error, data} = await getFollowing(id)

  return (
    <div className='flex w-full flex-col gap-4'>
      {
        data?.map(({following}, key) => (
          <SearchUserCard userData={following} key={key} />
        ))
      }
    </div>
  )
}

export default Following
