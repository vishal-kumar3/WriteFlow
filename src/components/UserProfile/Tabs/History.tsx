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

  if(HistoryData.length === 0) return <div>No History Found</div>

  return (
    <>
      {
        HistoryData?.blog?.map((card: UserFlowsCardProps, key: number) => (
          <UserFlowsCard
            key={key}
            id={card.id}
            title={card.title}
            tags={card.tags}
            isPublished={card.isPublished}
            description={card.description}
            createdAt={card.createdAt}
            thumbnail={card.thumbnail}
          />
        ))
      }
    </>
  )
}

export default History
