import Articles from '@/components/Dashboard/Articles'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import React from 'react'

type props = {}

const page = (props: props) => {
  return (
    <DashboardHeader title='Flows and Drafts' description='Status overview of your articles and drafts'>
      <Articles />
    </DashboardHeader>
  )
}

export default page
