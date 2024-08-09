import { auth } from '@/auth'
import prisma from '@/prisma'
import { UserFlowsCard, UserFlowsCardProps } from './UserFlows'

type props = {}

const History = async(props: props) => {
  const session = await auth()
  if (!session) return <div>You are not loggedIn</div>

  const HistoryData = await prisma.view.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      blog: true
    }
  })

  console.log("HistoryData:- ", HistoryData)

  if(HistoryData.length === 0) return <div>No History Found</div>

  return (
    <>
      {
        HistoryData?.map(({blog}: UserFlowsCardProps, key: number) => (
          <UserFlowsCard
            key={key}
            id={blog.id}
            title={blog.title}
            tags={blog.tags}
            isPublished={blog.isPublished}
            description={blog.description}
            createdAt={blog.createdAt}
            thumbnail={blog.thumbnail}
          />
        ))
      }
    </>
  )
}

export default History
