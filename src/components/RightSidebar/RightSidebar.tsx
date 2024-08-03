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
    <div className='m-10 ml-0 space-y-5 sticky top-[100px] h-screen w-[30%]'>
      <HomeDraftCard data={data!}/>

      Trending Article
    </div>
  )
}

export default RightSidebar
