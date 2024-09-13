"use client"
import { followToggle } from '@/actions/user.action'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useOptimistic } from 'react'
import { cn } from '@/lib/utils'

type props = {
  id: string,
  username: string
  isFollowing: boolean | null
  className?: string
}

const FollowButton = ({id, username, isFollowing, className}: props) => {

  const [isFollowingOptimistic, setIsFollowingOptimistic] = useOptimistic(
    isFollowing,
    (value, newIsFollowing: boolean) => {
      return newIsFollowing
    }
  )


  return (
    <Button onClick={async() => {

      setIsFollowingOptimistic(!isFollowingOptimistic)
      toast.success(isFollowingOptimistic ? `You unfollowed ${username}` : `You started following ${username}`)

      const { error, data } = await followToggle(id)
      if(error){
        toast.error(error)
      }
    }} className={cn("px-5",
      isFollowingOptimistic ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
      "text-white",
      className
    )}>
      {isFollowingOptimistic ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton
