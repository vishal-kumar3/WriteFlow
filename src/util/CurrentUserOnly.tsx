import { auth } from '@/auth'
import React from 'react'

type props = {
  children: React.ReactNode
  userId: string
}

const CurrentUserOnly = async({children, userId}: props) => {
  const session = await auth();

  if(session?.user?.id === userId){
    return await children
  }

  return null

}

export default CurrentUserOnly