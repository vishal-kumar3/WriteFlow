import { auth } from '@/auth'
import React from 'react'

type props = {
  children: React.ReactNode
}

const AuthUserOnly = async({children}: props) => {
  const session = await auth();

  if(session){
    return children;
  }

  return null
}

export default AuthUserOnly

{/* <AuthUserOnly>
  {(userId) => (
    <SomeComponent userId={userId} />
  )}
</AuthUserOnly> */}
