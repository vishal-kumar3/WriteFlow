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
import { FlowPublishButton } from "./RichEditor"
import Image from "next/image"
import { TagsSelection } from "./TagsSelection"
import { useState } from "react"
// import { uploadImage } from "@/actions/image.action"
import { uploadFile } from '@uploadcare/upload-client'
import { thumbnailUpload } from "@/actions/flow.action"
import { toast } from "sonner"


export function DraftPublishSidebar({ userId, flowId, thumbnail, title }: { userId: string, flowId: string, thumbnail: string | null, title: string }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const [articleSlug, setArticleSlug] = useState('')
  const placeholder = title.toLowerCase().replace(/\s/g, '-')

  const [flowThumbnail, setFlowThumbnail] = useState<string | null>(thumbnail)

  async function uploadImage(file: File) {
    // Ensure it's a client-side operation
    if (typeof window === 'undefined') {
      return { error: 'File uploads should happen on the client side.' };
    }

    if (!(file instanceof File)) {
      return { error: 'Invalid file type, expected File.' };
    }

    try {
      const result = await uploadFile(file, {
        publicKey: '511e1df4c0a33fe1a180', // Replace with your actual public key
        store: 'auto',
        metadata: {
          subsystem: 'uploader',
          pet: 'cat',
        },
      });

      if(result.cdnUrl){
        const {error, success} = await thumbnailUpload(flowId, result.cdnUrl);

        if(error){
          return { error: error };
        }
        return { success: result.cdnUrl };
      }
      return { error: 'There was a problem uploading your image, please try again.' };
    } catch (error) {
      console.error('Upload error in function:', error);
      return { error: 'There was a problem uploading your image, please try again.' };
    }
  }

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
            </div>

            {/* Image preview */}
            <div
              className="w-full h-[200px] bg-red-200 flex items-center justify-center cursor-pointer relative rounded-lg overflow-hidden"
              onClick={() => document.getElementById("file-input")?.click()} // Simulate click on the input
            >
              {flowThumbnail ? (
                <Image
                  src={flowThumbnail}
                  alt="Thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/Thumbnail.avif"
                    width={100}
                    height={100}
                    alt="Default Thumbnail"
                  />
                  <p className="text-sm text-gray-600">Click to upload thumbnail</p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files && e.target.files[0];
                const prevThumbnail = thumbnail;

                if (file) {
                  // Immediate preview using FileReader
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFlowThumbnail(e.target?.result as string);
                  };
                  reader.readAsDataURL(file);

                  try {
                    // Upload the image
                    const { success, error } = await uploadImage(file);

                    if (error) {
                      console.error("Upload error:", error);
                      toast.error(error);
                      setFlowThumbnail(prevThumbnail);
                    } else {
                      toast.success("Thumbnail uploaded successfully");
                      setFlowThumbnail(success!);
                    }
                  } catch (uploadError) {
                    console.error("Upload failed:", uploadError);
                    setFlowThumbnail(prevThumbnail);
                  }
                }
              }}
            />
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
