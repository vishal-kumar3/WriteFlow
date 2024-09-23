"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { column, ContentSettingsTable } from "./content"
import { HistoryWithBlogAndUser } from "@/types/ViewType"
import { UserWithBookmarkAndUserAndTags } from "@/types/BookmarkType"
import { LikedFlowWithTagsAndUser } from "@/types/LikeType"
import { BlogWithTagsAndUser } from "@/types/BlogType"

type props = {
  currentUserId: string
  historyData: HistoryWithBlogAndUser[]
  bookmarkData: UserWithBookmarkAndUserAndTags
  publishedData: BlogWithTagsAndUser[]
  likedData: LikedFlowWithTagsAndUser[]
  draftData: BlogWithTagsAndUser[]
}

const ContentTabSwitcher = ({ currentUserId, historyData, bookmarkData, publishedData, likedData, draftData }: props) => {
  const [activeTab, setActiveTab] = useState("Published Flow")

  const historyColumnData: column[] = historyData.map((data) => {
    const author = currentUserId === data?.blog?.user?.id ? "(You)" : data?.blog?.user?.username!
    return {
      id: data?.blog?.id!,
      title: data?.blog?.title!,
      author_link: `/user/${data?.blog?.user?.id}`,
      author: author,
      publishedAt: data?.blog?.publishedAt!,
      isPublished: data?.blog?.isPublished!,
      owned: currentUserId === data?.blog?.user?.id
    }
  }) || []

  const bookmarkColumnData: column[] = bookmarkData?.bookmarks.map((data) => {
    const author = currentUserId === data?.user?.id ? "(You)" : data?.user?.username!
    return {
      id: data?.id!,
      title: data?.title!,
      author_link: `/user/${data?.user?.id}`,
      author: author,
      publishedAt: data?.publishedAt!,
      isPublished: data?.isPublished!,
      owned: currentUserId === data?.user?.id
    }
  }) || []

  const publishedColumnData: column[] = publishedData.map((data) => {
    return {
      id: data?.id!,
      title: data?.title!,
      author_link: `/user/${data?.user?.id}`,
      author: "(You)",
      publishedAt: data?.publishedAt!,
      isPublished: data?.isPublished!,
      owned: true
    }
  }) || []

  const likedColumnData: column[] = likedData.map((data) => {
    const author = currentUserId === data?.blog?.user?.id ? "(You)" : data?.blog?.user?.username!
    return {
      id: data?.blog?.id!,
      title: data?.blog?.title!,
      author_link: `/user/${data?.blog?.user?.id}`,
      author: author,
      publishedAt: data?.blog?.publishedAt!,
      isPublished: data?.blog?.isPublished!,
      owned: currentUserId === data?.blog?.user?.id
    }
  }) || []

  const draftColumnData: column[] = draftData.map((data) => {
    return {
      id: data?.id!,
      title: data?.title!,
      author_link: `/user/${data?.user?.id}`,
      author: "(You)",
      publishedAt: data?.updatedAt!,
      isPublished: data?.isPublished!,
      owned: true
    }
  })

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="">
            {activeTab} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setActiveTab("Published Flow")}>Published Flow</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("Draft Flow")}>Draft Flow</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("Liked Flow")}>Liked Flow</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("Bookmarks")}>Bookmarks</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab("History")}>History</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TabsContent value="Published Flow"><ContentSettingsTable data={publishedColumnData} /></TabsContent>
      <TabsContent value="Draft Flow"><ContentSettingsTable data={draftColumnData} /></TabsContent>
      <TabsContent value="Liked Flow"><ContentSettingsTable data={likedColumnData} /></TabsContent>
      <TabsContent value="Bookmarks"><ContentSettingsTable data={bookmarkColumnData} /></TabsContent>
      <TabsContent value="History"><ContentSettingsTable data={historyColumnData} /></TabsContent>
    </Tabs>
  )
}

export default ContentTabSwitcher
