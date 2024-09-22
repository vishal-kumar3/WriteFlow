import { auth } from '@/auth'
import prisma from '@/prisma'
import { HistoryWithBlog } from '@/types/ViewType'
import { UserFlowsCard } from './UserFlows'
import { getHistoryData } from '@/actions/tabs.action'

type props = {}

const History = async(props: props) => {
  const session = await auth()
  if (!session) return <div>You are not loggedIn</div>

  const HistoryData: HistoryWithBlog[] = await getHistoryData(session?.user?.id!)

  if(HistoryData?.length === 0) return <div>No History Found</div>

  return (
    <>
      {
        HistoryData?.map((HistoryView: HistoryWithBlog, key: number) => (
          <UserFlowsCard
            key={key}
            userId={HistoryView?.blog?.userId!}
            id={HistoryView?.blog?.id!}
            title={HistoryView?.blog?.title!}
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
