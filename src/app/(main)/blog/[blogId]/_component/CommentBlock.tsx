import { Comment, commentType } from "./CommentSection"
import { useEffect, useState } from "react"
import { getComments } from "@/actions/flow.action"

type props = {}

export const CommentBlock = ({ flowId }: { flowId: string }) => {
  const [comments, setComments] = useState<commentType[]>([])


  useEffect(() => {
    const fetchComments = async () => {
      const {error, data} = await getComments(flowId)
      if(error) return <div>Error While Fetching Comments</div>
      setComments(data!)
    }

    fetchComments()
  }, [flowId, comments])


  return (
    <div>
      {
        comments.map(comment => (
          <Comment flowId={flowId} key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}
