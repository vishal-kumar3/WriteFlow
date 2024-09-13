import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import CurrentUserOnly from '@/util/CurrentUserOnly'
import { cn } from '@/lib/utils'
import { DotsHorizontalIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { CardDescription } from '../ui/card'
import { foramtDateTime } from '@/util/DateTime'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import DeleteFlowButton from '../RichEditor/DeleteFlowButton'
import { Dot, Eye, EyeIcon } from 'lucide-react'
import { Blog } from '@/types/BlogType'
import { FcComments, FcLike } from 'react-icons/fc'

type props = {
  PublishedArticles: React.ReactNode
  DraftArticles: React.ReactNode
}

export const FlowCard = ({ flowId, flowData }: { flowId: string, flowData: Blog }) => {
  return (
    <div className='flex items-center dark:hover:bg-black hover:bg-black/5 px-3 py-2 rounded-lg'>
      <Link href={`/blog/${flowId}`} className='flex-1'>
        <p className='line-clamp-1'>{flowData?.title}</p>
        <div className='text-sm text-muted-foreground flex flex-col md:flex-row gap-1 md:items-center'>
          <div>
            {foramtDateTime(flowData?.updatedAt!)}
          </div>
          {
            flowData?.isPublished &&
            <div className='flex'>
              <Dot className='hidden lg:flex' />
              <div className='flex gap-1 items-center'>
                <p>{flowData?.noOfViews}</p>
                <Eye className='w-4' />
              </div>
              <Dot />
              <div className='flex gap-1 items-center'>
                <p>{flowData?.noOfComments}</p>
                <FcComments className='w-4' />
              </div>
              <Dot />
              <div className='flex gap-1 items-center'>
                <p>{flowData?.likeCount}</p>
                <FcLike className='w-4' />
              </div>
            </div>
          }
        </div>
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DotsHorizontalIcon className='cursor-pointer hover:bg-black/5 w-fit h-fit p-3 py-2 rounded-2xl ' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=''>
            {
              !flowData?.isPublished && <Button className='w-full' variant="ghost"><Link href={`/blog/${flowId}`}>Edit</Link></Button>
            }
            <DeleteFlowButton flowId={flowId} userId={flowData?.userId!} modeClass='w-full' redirectMode={true} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

const FlowTabSwitcher = ({ PublishedArticles, DraftArticles }: props) => {
  return (
    <Tabs className='' defaultValue='Published'>
      <TabsList className='w-full space-x-8 bg-black/5 dark:bg-black/20 py-6'>
        <TabsTrigger className='text-lg' value='Published'>Published</TabsTrigger>
        <TabsTrigger className='text-lg' value='DraftFlows'>Draft Flows</TabsTrigger>
      </TabsList>

      <div>
        <TabsContent value='Published'>{PublishedArticles}</TabsContent>
        <TabsContent value='DraftFlows'>{DraftArticles}</TabsContent>
      </div>
    </Tabs>
  )
}

export default FlowTabSwitcher
