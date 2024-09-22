import { getBookmarkData, getDraftData, getHistoryData, getLikedData, getPublishedData } from '@/actions/tabs.action'
import { auth } from '@/auth'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import ContentTabSwitcher from '@/components/Settings/content/contentTabSwitcher'
import React from 'react'

type props = {}

const page = async(props: props) => {
  const session = await auth()
  if(!session) return <div>You are not loggedIn</div>

  const historyData = await getHistoryData(session?.user?.id!)
  const bookmarkData = await getBookmarkData(session?.user?.id!)
  const publishedData = await getPublishedData(session?.user?.id!)
  const likedData = await getLikedData(session?.user?.id!)
  const draftData = await getDraftData(session?.user?.id!)

  return (
    <DashboardHeader title='Content Settings'>
      <ContentTabSwitcher
        historyData={historyData}
        bookmarkData={bookmarkData}
        publishedData={publishedData}
        likedData={likedData}
        draftData={draftData}
      />
    </DashboardHeader>
  )
}

export default page
