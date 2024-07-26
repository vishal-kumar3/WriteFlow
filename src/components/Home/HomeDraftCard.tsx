import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

type props = {}

const HomeDraftCard = (props: props) => {
  return (
    <Card className=' '>
      <CardHeader className='flex flex-row pb-1 justify-between items-center'>
        <CardTitle>Drafts (2)</CardTitle>
        <Button variant="outline" className='rounded-3xl'>See all</Button>
      </CardHeader>
      <CardContent>
        <CardTitle className='text-xl'>No title</CardTitle>
        <CardDescription>Edited 6 mins . Continue editing</CardDescription>
      </CardContent>
      <CardContent>
        <CardTitle className='text-xl'>No title</CardTitle>
        <CardDescription>Edited 6 mins . Continue editing</CardDescription>
      </CardContent>
    </Card>
  )
}

export default HomeDraftCard