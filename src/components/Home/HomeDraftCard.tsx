import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { formatDateAgo } from '@/util/DateTime'
import Link from 'next/link'
import { Blog } from '@/types/BlogType'


export type HomeDraftProps = {
  data: Blog[]
}

const HomeDraftCard = ({ data }: HomeDraftProps) => {
  return (
    <Card className=''>
      <CardHeader className='flex flex-row mb-2 justify-between items-center'>
        <CardTitle>Drafts ({data.length})</CardTitle>
        {/* //TODO: See all will take to draft page in profile */}
        {/* <Button variant="outline" className='rounded-3xl'>See all</Button> */}
      </CardHeader>
      {
        data.map((draft, index) => (
          <Link key={index} href={`/blog/draft/${draft?.id}`}>
            <CardContent >
              <CardTitle className='line-clamp-1 text-lg'>{draft?.title}</CardTitle>
              <CardDescription>Last edited {formatDateAgo(draft?.updatedAt!)}</CardDescription>
            </CardContent>
          </Link>
        ))
      }
    </Card>
  )
}

export default HomeDraftCard
