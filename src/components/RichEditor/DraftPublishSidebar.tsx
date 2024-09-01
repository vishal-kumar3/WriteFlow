"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "../ui/switch"
import FileUploader from "@/lib/fileUploader"
import { updateFlowThumbnailImage } from "@/actions/image.action"
import { FlowPublishButton } from "./RichEditor"
import Image from "next/image"
import { TagsSelection } from "./TagsSelection"
import { useState } from "react"

export function DraftPublishSidebar({ userId, flowId, thumbnail, title }: { userId: string, flowId: string, thumbnail: string | null, title: string }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [articleSlug, setArticleSlug] = useState('')
  const placeholder = title.toLowerCase().replace(/\s/g, '-')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Publish</Button>
      </SheetTrigger>
      <SheetContent className=" overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Draft Settings</SheetTitle>
          <hr />
        </SheetHeader>
        <form className="mt-8 space-y-8">
          <div className="space-y-3">
            <Label>Article Slug</Label>
            <Input
              // if empty then use title as placeholder with spaces replaced by hyphens
              placeholder={placeholder}
              value={articleSlug}
              onChange={(e) => {
                e.target.value = e.target.value.toLowerCase()
                e.target.value = e.target.value.replace(/^\s+/, '')
                e.target.value = e.target.value.replace(/-{2,}/g, '-')
                e.target.value = e.target.value.replace(/\s/g, '-')
                setArticleSlug(e.target.value)
              }}
            />
          </div>
          <div className="space-y-3">
            <Label>Select Tags</Label>
            <TagsSelection selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Thumbnail</Label>
              <FileUploader
                uploadImageAction={updateFlowThumbnailImage}
                ctx_name="flowThumbnail"
                flowMode={true}
                flowId={flowId}
                userId={userId}
              />
            </div>
            <Image src={thumbnail || '/Thumbnail.avif'} width={500} height={200} alt="Thumbnail" className="w-full bg-red-200 h-[200px] object-cover object-center overflow-hidden rounded-lg">
              {/* //TODO: Image hoga yaha pe */}
            </Image>
          </div>
          <div className="flex gap-3 space-y-3">
            <div>
              <Label htmlFor="isCommentOff">Disable Comments</Label>
              <p className="text-sm opacity-75">This will hide the comments section below your article</p>
            </div>
            <Switch id="isCommentOff" checked={checked} onCheckedChange={(e) => setChecked(!checked)} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <FlowPublishButton
                flowId={flowId}
                userId={userId}
                tags={selectedTags}
                isCommentOff={checked}
                slug={articleSlug || placeholder}
              />
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
