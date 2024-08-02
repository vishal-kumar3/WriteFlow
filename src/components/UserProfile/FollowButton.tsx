"use client"
import { followToggle } from '@/actions/user.action'
import { Button } from '../ui/button'
import { toast } from 'sonner'

type props = {
  id: string
  isAlreadyFollowing: any
}

const FollowButton = ({id, isAlreadyFollowing}: props) => {

  return (
    <Button onClick={async() => {
      const { error, success } = await followToggle(id)

      if(error){
        toast.error(error)
      }else {
        toast.success(success)
      }
    }} className="px-5 bg-blue-400">{isAlreadyFollowing ? "Unfollow" : "Follow"}</Button>
  )
}

export default FollowButton