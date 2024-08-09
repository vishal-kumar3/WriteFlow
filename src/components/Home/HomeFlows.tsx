import React from 'react'
import HomeFlowCard from './HomeFlowCard'
import { auth } from '@/auth'
import prisma from '@/prisma'

type HomeFlowDataProps = {
  data: FlowData[]
}

export type FlowUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  username: string;
}

export type FlowData = {
  id: string
  title: string,
  description: string | null,
  thumbnail: string | null,
  likeCount: number,
  noOfComments: number,
  noOfViews: number,
  createdAt: Date,
  user: FlowUser
}

const HomeFlows = async({ data }: HomeFlowDataProps) => {

  const session = await auth()
  let userBookmarks: {id:string}[] = []

  if(session){
    const user = await prisma.user.findUnique({
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
    <div className="max-w-[70%]">
      {
        data.map((flow, key) => (
          <HomeFlowCard key={key} userBookmark={userBookmarks} flow={flow} />
        ))
      }
    </div>
  )
}

export default HomeFlows
