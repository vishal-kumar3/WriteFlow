"use client"
import prisma from '@/prisma'
import LinkButton from './LinkButton'
import { DefaultAvatarImage } from '@/app/(main)/user/[userId]/page'
import { useEffect, useState } from 'react'
import { User } from '@/types/UserType'
import { getFollowingUsers } from '@/actions/user.action'

const Followings = ({userId}: {userId: any}) => {
  const [followingUser, setFollowingUser] = useState<User>(null)

  useEffect(() => {
    async function getFollowingUser() {
      const followingUser = await getFollowingUsers(userId)
      setFollowingUser(followingUser)
    }

    getFollowingUser()
  }, [userId])

  return (
    <LinkButton imageUrl={followingUser?.image || DefaultAvatarImage} link={`/user/${followingUser?.id}`}>{followingUser?.name}</LinkButton>
  )
}

export default Followings
