import React from 'react'
import HomeDraftCard, { HomeDraftProps } from '../Home/HomeDraftCard'
import { auth } from '@/auth'
import { getDraftFlow } from '@/actions/flow.action'

type props = {}

const RightSidebar = async(props: props) => {
  const session = await auth()
  if(!session) return { error: "You are not logged in" }
  const userId = session.user.id

  const {error, data} = await getDraftFlow(userId)

  if(error) return <div>{error}</div>


  return (
    <div className='pb-10 hidden md:block my-4 m-10 mt-0 ml-0 space-y-5 sticky top-[75px] overflow-y-scroll h-screen max-w-[333px] flex-1'>
      <HomeDraftCard data={data!}/>
    </div>
  )
}

export default RightSidebar
