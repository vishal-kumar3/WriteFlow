import { isAlreadyFollowing } from '@/actions/user.action'
import React from 'react'
import FollowButton from './FollowButton'
import { auth } from '@/auth'

type props = {
  id: string,
  username: string
  className?: string
}

const FollowButtonServerWraper = async({id, username, className}: props) => {
  const session = await auth()
  if (session){
    if(session.user.id === id) return null
  }
  const alreadyFollowing = await isAlreadyFollowing(id)

  return (
    <>
      <FollowButton
        id={id}
        username={username}
        isFollowing={alreadyFollowing.data || null}
        className={className}
      />
    </>
  )
}

export default FollowButtonServerWraper
