import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Delete, DeleteIcon, Heart, MessageCircleMore, Send, Trash } from "lucide-react"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { commentFlow } from "@/actions/flow.action"
import { User } from "@prisma/client"
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page"
import { CommentButtons } from "./CommentButtons"


// TODO: Comment Block pe hover pe CommentFlow dikhna chahiye!!!
export const Comment = ({
  disabled,
  comment,
  flowId,
  avatarImage,
  username,
}: {disabled?: boolean, comment?: commentType, flowId: string, avatarImage: string | null, username: string}) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage src={avatarImage || DefaultAvatarImage} alt={username} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <form action={commentFlow} className="w-full">
        <div className="flex gap-0">
          {/* <input type="text" className="hidden" id="parentId" name="parentId" value={null} /> */}
          <input type="text" className="hidden" id="flowId" name="flowId" defaultValue={flowId} />
          <div className="w-full">
            {/* <p>@{username}</p> */}
            <Input
              id="content"
              name="content"
              value={comment?.content}
              placeholder="Enter your comment here..."
              className="disabled:text-lg disabled:border-none disabled:opacity-100 disabled:cursor-auto"
              disabled={disabled || false}
              required
            />
          </div>
          {
            !disabled && <Button variant="ghost" type="submit"><Send /></Button>

          }
        </div>
        {
          disabled && <CommentButtons likeCount={comment?.likeCount!} flowId={flowId} commentId={comment?.id!} />
        }
        {/* <CommentButtons /> */}
      </form>
    </div>
  )
}

export type commentType = {
  id: string;
  userId: string | null;
  blogId: string | null;
  content: string;
  parentId: string | null;
  likeCount: number;
  user: User
  createdAt: Date;
  updatedAt: Date;
}


export function CommentSection({comment, flowId, currentUser }: {comment: commentType[], flowId: string, currentUser: User | null}) {


  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <MessageCircleMore />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          <SheetTitle>Comment Section</SheetTitle>
          <SheetDescription>
            Kindly follow the guidelines to keep the comment section clean and respectful.
          </SheetDescription>
        </SheetHeader>
        <Comment avatarImage={currentUser?.image!} username={currentUser?.username!} flowId={flowId} />

        {/* yaha se sara comment start hoga */}

        <div className="flex mt-5 flex-col gap-2">
          {
            comment.map((comment, index) => (
              <Comment avatarImage={comment.user.image} username={comment.user.username} key={index} disabled comment={comment} flowId={flowId} />
            ))
          }
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close Comment Section</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
