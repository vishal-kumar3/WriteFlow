import React from 'react'
import { UserFlowsCard } from './UserFlows'

type props = {}

const DraftFlows = (props: props) => {
  return (
    <>
      <UserFlowsCard
        title="Draft Flows"
        thumbnail="Card Thumbnail"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea id obcaecati consequuntur quas rerum, impedit vero amet aut iste eligendi illum ipsum incidunt ducimus voluptates. Nobis, possimus? Magni molestias ducimus labore, in fugiat aperiam repellat aspernatur quisquam illo. Praesentium, omnis."
        publishDate="Draft Flows Publish Date"
      />
      <UserFlowsCard
        title="Draft Flows"
        thumbnail="Card Thumbnail"
        description="Draft Flows Description"
        publishDate="Draft Flows Publish Date"
      />
      <UserFlowsCard
        title="Draft Flows"
        thumbnail="Card Thumbnail"
        description="Draft Flows Description"
        publishDate="Draft Flows Publish Date"
      />
      <UserFlowsCard
        title="Draft Flows"
        thumbnail="Card Thumbnail"
        description="Draft Flows Description"
        publishDate="Draft Flows Publish Date"
      />
    </>
  )
}

export default DraftFlows