import { auth } from '@/auth'
import prisma from '@/prisma'
import React from 'react'
import { UserFlowsCard, UserFlowsCardProps } from './UserFlows'
import { getLikedData } from '@/actions/tabs.action'

type props = {}

const LikedFlows = async(props: props) => {

  const session = await auth()
  if (!session) return <div>You are not loggedIn</div>

  const LikedFlowData = await getLikedData(session?.user?.id!)

  if(LikedFlowData.length === 0) return <div>No Liked Flows Found</div>

  return (
    <>
      {
        LikedFlowData?.map((card, key: number) => {
          if(!card) return null

          return (
            <UserFlowsCard
              key={key}
              id={card.blog.id}
              title={card.blog.title}
              tags={card.blog.tags}
              isPublished={card.blog.isPublished}
              description={card.blog.description}
              createdAt={card.blog.createdAt}
              thumbnail={card.blog.thumbnail}
            />
          )
        })
      }
    </>
  )
}

export default LikedFlows
