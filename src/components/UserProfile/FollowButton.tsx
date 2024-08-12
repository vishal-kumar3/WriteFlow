"use client"
import { followToggle, isAlreadyFollowing } from '@/actions/user.action'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

type props = {
  id: string
}

const FollowButton = ({id}: props) => {
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    async function isFollowing() {
      const { error, data } = await isAlreadyFollowing(id)
      if(error){
        toast.error(error)
      }
      else {
        setIsFollowing(data!)
      }
    }

    isFollowing()
  }, [id])

  return (
    <Button onClick={async() => {
      const { error, success, data } = await followToggle(id)

      if(error){
        toast.error(error)
      }else {
        setIsFollowing(data!)
        toast.success(success)
      }
    }} className="px-5 bg-blue-400 hover:bg-blue-500">{isFollowing ? "Unfollow" : "Follow"}</Button>
  )
}

export default FollowButton
