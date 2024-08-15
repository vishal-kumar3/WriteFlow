"use client"
import { followToggle, isAlreadyFollowing } from '@/actions/user.action'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useEffect, useOptimistic, useState } from 'react'
import { cn } from '@/lib/utils'

type props = {
  id: string,
  username: string
}

const FollowButton = ({id, username}: props) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [flagMount, setFlagMount] = useState(true)


  const [isFollowingOptimistic, setIsFollowingOptimistic] = useOptimistic(
    isFollowing,
    (value, newIsFollowing: boolean) => {
      return newIsFollowing
    }
  )

  useEffect(() => {
    async function isFollowing() {
      const { error, data } = await isAlreadyFollowing(id)
      if(error){
        toast.error(error)
      }
      // else if (!flagMount) {
      //   setFlagMount(false)
      // }
      else {
        setIsLoading(true)
        setIsFollowing(data!)
      }
    }

    isFollowing()
  }, [id])

  // if(flagMount) return null
  if(!isLoading) return <Button className='bg-gray-100 px-2 text-gray-100'>Follow</Button>

  return (
    <Button onClick={async() => {

      setIsFollowingOptimistic(!isFollowingOptimistic)
      toast.success(isFollowingOptimistic ? `You unfollowed ${username}` : `You started following ${username}`)

      const { error, data } = await followToggle(id)

      if(error){
        toast.error(error)
      }else {
        setIsFollowing(data!)
      }
    }} className={cn("px-5",
      isFollowingOptimistic ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
      "text-white"
    )}>
      {isFollowingOptimistic ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton
