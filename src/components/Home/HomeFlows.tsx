import React from 'react'
import HomeFlowCard from './HomeFlowCard'
import { auth } from '@/auth'
import prisma from '@/prisma'
import { FlowForHome } from '@/app/(main)/page'
import { UserWithBookmarkId } from '@/types/UserType'


const HomeFlows = async ({ data }: { data: FlowForHome}) => {

  const session = await auth()
  let userBookmarks: {id:string}[] = []

  if(session){
    const user: UserWithBookmarkId = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        bookmarks: {
          select: {
            id: true
          }
        }
      }
    })

    userBookmarks = user?.bookmarks || []
  }


  return (
    <div className="md:w-[70%]">
      {
        data.map((flow, key) => (
          <HomeFlowCard key={key} userBookmark={userBookmarks} flow={flow} />
        ))
      }
    </div>
  )
}

export default HomeFlows
