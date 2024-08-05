import { auth } from '@/auth'
import prisma from '@/prisma'
import React from 'react'
import { UserFlowsCard, UserFlowsCardProps } from './UserFlows'

type props = {}

const LikedFlows = async(props: props) => {

  const session = await auth()
  if (!session) return <div>You are not loggedIn</div>

  const LikedFlowData = await prisma.like.findMany({
    where: {
      userId: session.user.id
    },
    select: {
      blog: true
    }
  })

  if(LikedFlowData.length === 0) return <div>No Liked Flows Found</div>

  return (
    <>
      {
        LikedFlowData?.blog?.map((card: UserFlowsCardProps, key: number) => (
          <UserFlowsCard
            key={key}
            id={card.id}
            title={card.title}
            tags={card.tags}
            isPublished={card.isPublished}
            description={card.description}
            createdAt={card.createdAt}
            thumbnail={card.thumbnail}
          />
        ))
      }
    </>
  )
}

export default LikedFlows
