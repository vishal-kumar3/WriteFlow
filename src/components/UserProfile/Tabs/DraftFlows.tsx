import React from 'react'
import { UserFlowsCard, UserFlowsProps } from './UserFlows'


const DraftFlows = ({data}: UserFlowsProps) => {
  return (
    <>
      {
        data.map((card, key) => (
          <UserFlowsCard
            key={key}
            id={card.id}
            title={card.title}
            description={card.description}
            isPublished={card.isPublished}
            thumbnail={card.thumbnail}
            createdAt={card.createdAt}
          />
        ))
      }
    </>
  )
}

export default DraftFlows
