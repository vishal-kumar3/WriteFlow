import Articles from '@/components/Dashboard/Articles'
import React from 'react'

type props = {}

const page = (props: props) => {
  return (
    <div className='m-10'>
      Breadcrum here
      <div className="border-b">
        <p className="text-4xl font-semibold">Flows and Drafts</p>
        <p className="opacity-50 mt-1 mb-6">
          Status overview of your articles and drafts
        </p>
      </div>
      <Articles />
    </div>
  )
}

export default page
