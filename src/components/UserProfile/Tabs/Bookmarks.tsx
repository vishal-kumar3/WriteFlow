import { auth } from '@/auth'
import { UserFlowsCard } from './UserFlows'
import { UserWithBookmarkAndUserAndTags } from '@/types/BookmarkType'
import { getBookmarkData } from '@/actions/tabs.action'

type props = {}

const Bookmarks = async(props: props) => {

  const session = await auth()
  if(!session) return <div>You are not loggedIn</div>

  const BookmarkData: UserWithBookmarkAndUserAndTags = await getBookmarkData(session?.user?.id!)

  return (
    <>
      {
        BookmarkData?.bookmarks.map((card, key: number) => (
          <UserFlowsCard
            key={key}
            id={card.id}
            title={card.title}
            // TODO: Tags user model me add krna h
            // tags={card.tags}
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
