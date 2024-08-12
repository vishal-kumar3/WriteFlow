import { auth } from '@/auth'
import prisma from '@/prisma'
import { HistoryWithBlog } from '@/types/ViewType'
import { UserFlowsCard } from './UserFlows'

type props = {}

const History = async(props: props) => {
  const session = await auth()
  if (!session) return <div>You are not loggedIn</div>

  const HistoryData: HistoryWithBlog[] = await prisma.view.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      blog: true
    }
  })

  if(HistoryData?.length === 0) return <div>No History Found</div>

  return (
    <>
      {
        HistoryData?.map((HistoryView: HistoryWithBlog, key: number) => (
          <UserFlowsCard
            key={key}
            id={HistoryView?.blog?.id!}
            title={HistoryView?.blog?.title!}
            // tags={HistoryView?.blog?.tags!}
            isPublished={HistoryView?.blog?.isPublished!}
            description={HistoryView?.blog?.description!}
            createdAt={HistoryView?.blog?.createdAt!}
            thumbnail={HistoryView?.blog?.thumbnail!}
          />
        ))
      }
    </>
  )
}

export default History
