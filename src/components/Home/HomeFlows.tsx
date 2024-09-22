import React from 'react'
import HomeFlowCard from './HomeFlowCard'
import { auth } from '@/auth'
import prisma from '@/prisma'
import { FlowForHome, HomePageProps } from '@/app/(main)/page'
import { UserWithBookmarkId } from '@/types/UserType'
import { getFlowForHome } from '@/actions/flow.action'

type getFlowHomeProps = {
  error?: string | null
  data?: FlowForHome
}

const HomeFlows = async ({ searchParams }: HomePageProps) => {

  const session = await auth()
  let userBookmarks: {id:string}[] = []

  const { error, data }: getFlowHomeProps = await getFlowForHome(searchParams.search || '');
  if (error) return <div>{error}</div>

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
    <div className="flex-1 md:max-w-[800px]">
      {
        data?.map((flow, key) => (
          <HomeFlowCard key={key} userBookmark={userBookmarks} flow={flow} />
        ))
      }
    </div>
  )
}

export default HomeFlows
