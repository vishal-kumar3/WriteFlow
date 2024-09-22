"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { column, DataTableDemo } from "./content"
import { HistoryWithBlog } from "@/types/ViewType"
import { UserWithBookmark } from "@/types/BookmarkType"
import { LikedFlowWithTags } from "@/types/LikeType"
import { BlogWithTags } from "@/types/BlogType"

type props = {
  historyData: HistoryWithBlog[]
  bookmarkData: UserWithBookmark
  publishedData: BlogWithTags[]
  likedData: LikedFlowWithTags[]
  draftData: BlogWithTags[]
}

const ContentTabSwitcher = ({ historyData, bookmarkData, publishedData, likedData, draftData }: props) => {
  const [activeTab, setActiveTab] = useState("Published Flow")

  const historyColumnData: column[] = historyData.map((data) => {
    return {
      id: data?.blog?.id!,
      title: data?.blog?.title!,
      author: data?.blog?.userId!,
      publishedAt: data?.blog?.publishedAt!,
      isPublished: data?.blog?.isPublished!,
    }
  }) || []

  const bookmarkColumnData: column[] = bookmarkData?.bookmarks.map((data) => {
    return {
      id: data?.id!,
      title: data?.title!,
      author: data?.userId!,
      publishedAt: data?.publishedAt!,
      isPublished: data?.isPublished!,
    }
  }) || []

  const publishedColumnData: column[] = publishedData.map((data) => {
    return {
      id: data?.id!,
      title: data?.title!,
      author: data?.userId!,
      publishedAt: data?.publishedAt!,
      isPublished: data?.isPublished!,
    }
  }) || []

  const likedColumnData: column[] = likedData.map((data) => {
    return {
      id: data?.blog?.id!,
      title: data?.blog?.title!,
      author: data?.blog?.userId!,
      publishedAt: data?.blog?.publishedAt!,
      isPublished: data?.blog?.isPublished!,
    }
  }) || []

  const draftColumnData: column[] = draftData.map((data) => {
    return {
      id: data?.id!,
      title: data?.title!,
      author: data?.userId!,
      publishedAt: data?.createdAt!,
      isPublished: data?.isPublished!,
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
      <TabsContent value="Published Flow"><DataTableDemo data={publishedColumnData} /></TabsContent>
      <TabsContent value="Draft Flow"><DataTableDemo data={draftColumnData} /></TabsContent>
      <TabsContent value="Liked Flow"><DataTableDemo data={likedColumnData} /></TabsContent>
      <TabsContent value="Bookmarks"><DataTableDemo data={bookmarkColumnData} /></TabsContent>
      <TabsContent value="History"><DataTableDemo data={historyColumnData} /></TabsContent>
    </Tabs>
  )
}

export default ContentTabSwitcher
