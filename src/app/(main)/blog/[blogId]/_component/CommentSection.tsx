"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { MessageCircleMore, Send } from "lucide-react"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { commentFlow } from "@/actions/flow.action"
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page"
import { CommentButtons } from "./CommentButtons"
import { CommentWithUser } from "@/types/CommentType"
import { User } from "@/types/UserType"
import { useOptimistic, useState } from "react"
import { toast } from "sonner"
import LoadingCircle from "@/components/ui/icons/loading-circle"
import Link from "next/link"

type CommentProps = {
  disabled?: boolean
  optimisticComment?: CommentWithUser
  addOptimisticComment?: (comment: CommentWithUser) => void
  flowId: string
  currentUser?: User
  auth: boolean
}

// TODO: Comment Block pe hover pe CommentFlow dikhna chahiye!!!
export const Comment = ({
  disabled,
  optimisticComment,
  flowId,
  currentUser,
  addOptimisticComment,
  auth,
}: CommentProps) => {
  const [isCommentSending, setIsCommentSending] = useState(false)

  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage className="object-cover object-center" src={currentUser?.image || DefaultAvatarImage} alt={currentUser?.username!} />
        <AvatarFallback>{currentUser?.username}</AvatarFallback>
      </Avatar>
      <form onSubmit={async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsCommentSending(true);

        const form = e.target as HTMLFormElement; // Type assertion
        const formData = new FormData(form);
        const { error, success } = await commentFlow(formData);

        if (error) {
          toast.error(error);
        } else if (success) {
          toast.success(success);
          form.reset(); // Reset form after successful submission
        }

        setIsCommentSending(false);
      }} className="w-full">
        <div className="flex gap-0">
          <input type="text" className="hidden" readOnly id="flowId" name="flowId" defaultValue={flowId} />
          <div className="w-full">
            <Input
              id="content"
              name="content"
              value={optimisticComment?.content}
              placeholder="Enter your comment here..."
              className="disabled:text-lg disabled:border-none disabled:cursor-auto disabled:text-black dark:disabled:text-white"
              readOnly={disabled || false}
              disabled={disabled || isCommentSending || false}
              required
            />
          </div>
          {
            !disabled &&
              <Button  variant="ghost" type="submit">

                {
                  isCommentSending ? <LoadingCircle /> : <Send className="w-6" />
                }
              </Button>

          }
        </div>
        {
          disabled && <CommentButtons auth={auth} likeCount={optimisticComment?.likeCount!} flowId={flowId} commentId={optimisticComment?.id!} />
        }
        {/* <CommentButtons /> */}
      </form>
    </div>
  )
}

export type CommentSectionProps = {
  comment: CommentWithUser[]
  flowId: string
  currentUser: User
}

export function CommentSection({ comment, flowId, currentUser }: CommentSectionProps) {

  const [optimisticComment, addOptimisticComment] = useOptimistic<CommentWithUser[], CommentWithUser>(
    comment,
    (state, newComment: CommentWithUser) => {
      return [
        ...state,
        newComment
      ]
    }
  )

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
        {
          currentUser ? (
            <Comment auth={true} disabled={false} addOptimisticComment={addOptimisticComment} currentUser={currentUser} flowId={flowId} />
          ) : (
            <Link href={'/auth/login'}>
              <Button variant='secondary'>Login To Comment!!</Button>
            </Link>
          )
        }

        {/* yaha se sara comment start hoga */}

        <div className="flex mt-5 flex-col gap-2">
          {
            comment.map((comment, index) => (
              <Comment auth={comment?.user?.id === currentUser?.id} key={index} disabled={true} currentUser={comment?.user} optimisticComment={comment} flowId={flowId} />
            ))
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}
