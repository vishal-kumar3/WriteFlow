import { auth } from '@/auth'
import prisma from '@/prisma'
import { Blog } from '@/types/BlogType'
import React from 'react'
import { Card } from '../ui/card'
import { FlowCard } from './FlowTabSwitcher'

type props = {}

const PublishedArticles = async (props: props) => {
  const session = await auth()
  if (!session) return null

  const publishedFlows: Blog[] = await prisma.blog.findMany({
    where: {
      userId: session.user.id,
      isPublished: true
    }
  }).catch((e) => {
    console.log(e)
    return []
  })

  return (
    <Card className='w-[75%] mx-auto space-y-2 px-2 py-5'>
      {
        publishedFlows.map((flow: Blog) => {
          if(flow)
          return <FlowCard flowData={flow} key={flow.id} flowId={flow.id} />
        })
      }
    </Card>
  )
}

export default PublishedArticles
