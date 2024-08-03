import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { formatDate } from '@/util/DateTime'
import Link from 'next/link'
import { Dot, DotIcon } from 'lucide-react'
import { DotFilledIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'

type props = {}

type HomeDraftDataProps = {
  title: string
  updatedAt: Date
  id: string
}

export type HomeDraftProps = {
  data: HomeDraftDataProps[]
}

const HomeDraftCard = ({data}: HomeDraftProps) => {
  return (
    <Card className=' '>
      <CardHeader className='flex flex-row mb-2 justify-between items-center'>
        <CardTitle>Drafts ({data.length})</CardTitle>
        {/* //TODO: See all will take to draft page in profile */}
        <Button variant="outline" className='rounded-3xl'>See all</Button>
      </CardHeader>
      {
        data.map((draft, index) => (
          <Link key={index} href={`/blog/draft/${draft.id}`}>
            <CardContent >
              <CardTitle className='line-clamp-1 text-lg'>{draft.title}</CardTitle>
              <CardDescription>Last edited {formatDate(draft.updatedAt)}</CardDescription>
            </CardContent>
          </Link>
        ))
      }
    </Card>
  )
}

export default HomeDraftCard
