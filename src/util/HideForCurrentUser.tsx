import { auth } from '@/auth'
import React from 'react'

type props = {
  children: React.ReactNode
  userId: string
}

const HideForCurrentUser = async({children, userId}: props) => {
  const session = await auth();
  const currentUserId = session?.user.id;
  if(currentUserId !== userId){
    return children
  }

  return null
}

export default HideForCurrentUser