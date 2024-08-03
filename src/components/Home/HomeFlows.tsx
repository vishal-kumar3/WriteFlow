import React from 'react'
import HomeFlowCard from './HomeFlowCard'

type HomeFlowDataProps = {
  data: FlowData[]
}

export type FlowUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export type FlowData = {
  id: string
  title: string,
  description: string | null,
  tags: string[],
  thumbnail: string | null,
  likeCount: number,
  noOfComments: number,
  noOfViews: number,
  createdAt: Date,
  user: FlowUser
}

const HomeFlows = ({ data }: HomeFlowDataProps) => {

  return (
    <div className="max-w-[70%]">
      {
        data.map((flow, key) => (
          <HomeFlowCard key={key} flow={flow} />
        ))
      }
    </div>
  )
}

export default HomeFlows
