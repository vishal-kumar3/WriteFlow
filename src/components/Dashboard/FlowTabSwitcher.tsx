import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import CurrentUserOnly from '@/util/CurrentUserOnly'
import {cn } from '@/lib/utils'

type props = {
  // PublishedFlows: React.ReactNode
  // DraftFlows: React.ReactNode
}

const FlowTabSwitcher = (props: props) => {
  return (
    <Tabs className='' defaultValue='UserFlows'>
      <TabsList className='w-full mx-auto space-x-8 bg-black/5 dark:bg-black/20 py-6'>
        <TabsTrigger className='text-lg' value='Published'>Published</TabsTrigger>
          <TabsTrigger className='text-lg' value='DraftFlows'>Draft Flows</TabsTrigger>
          <TabsTrigger className='text-lg' value='LikedFlows'>Liked Flows</TabsTrigger>
          <TabsTrigger className='text-lg' value='Bookmarks'>Bookmarks</TabsTrigger>
          <TabsTrigger className='text-lg' value='History'>History</TabsTrigger>
      </TabsList>

      <div>
        <TabsContent value='Published'>Tabs</TabsContent>
      </div>
    </Tabs>
  )
}

export default FlowTabSwitcher
