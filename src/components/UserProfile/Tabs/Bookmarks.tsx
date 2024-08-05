import { auth } from '@/auth'
import prisma from '@/prisma'
import { UserFlowsCard, UserFlowsCardProps, UserFlowsProps } from './UserFlows'

type props = {}

const Bookmarks = async(props: props) => {

  const session = await auth()
  if(!session) return <div>You are not loggedIn</div>

  const BookmarkData = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      bookmarks: true
    }
  })

  return (
    <>
      {
        BookmarkData?.bookmarks.map((card: UserFlowsCardProps, key: number) => (
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

export default Bookmarks
