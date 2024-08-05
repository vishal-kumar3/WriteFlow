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

export function DraftPublishSidebar({userId, flowId, thumbnail}: {userId: string, flowId: string, thumbnail: string | null}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Publish</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Draft Settings</SheetTitle>
          <hr />
        </SheetHeader>
        <form className="mt-8 space-y-8">
          <div className="space-y-3">
            <Label>Article Slug</Label>
            <Input placeholder="article-slug" />
          </div>
          <div className="space-y-3">
            <Label>Select Tags</Label>
            <Input placeholder="Tags" />
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
              <Label>Disable Comments</Label>
              <p className="text-sm opacity-75">This will hide the comments section below your article</p>
            </div>
            <Switch />
          </div>
        <SheetFooter>
          <SheetClose asChild>
              <FlowPublishButton flowId={flowId} userId={userId} />
          </SheetClose>
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
