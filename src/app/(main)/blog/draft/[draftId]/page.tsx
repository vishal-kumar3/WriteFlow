import { updateFlowCoverImage } from "@/actions/image.action"
import { DefaultCoverImage } from "@/app/(main)/user/[userId]/page"
import { auth } from "@/auth"
import DeleteFlowButton from "@/components/RichEditor/DeleteFlowButton"
import Editor from "@/components/RichEditor/NovelEditor/NovelEditor"
import NovelEditor from "@/components/RichEditor/NovelEditor/NovelEditor"
import RichEditor from "@/components/RichEditor/RichEditor"
import CoverImage from "@/components/UserProfile/CoverImage"
import prisma from "@/prisma"
import { BlogWithTags } from "@/types/BlogType"

type DraftPageProps = {
  params: {
    draftId: string
  }
}

const DraftPage = async ({ params }: DraftPageProps) => {
  const { draftId } = params
  if (!draftId) return <div>No draft id provided</div>

  const session = await auth()
  if (!session) return <div>User not logged in</div>

  const DraftFlowData: BlogWithTags = await prisma.blog.findUnique({
    where: {
      userId: session.user.id,
      id: draftId,
      isPublished: false,
    },
    include: {
      tags: true
    }
  })

  if (!DraftFlowData) return <div>No draft found</div>
  return (
    <div className="relative py-20 mx-auto max-w-[80%]">
      <CoverImage
        coverImage={DraftFlowData.coverImage || DefaultCoverImage}
        uploadImageAction={updateFlowCoverImage}
        flowId={draftId}
        userId={session.user.id}
        flowMode={true}
      />
      <RichEditor
        {...DraftFlowData}
      />
      <Editor initialValue={<>Holla</>} />
      <div className="absolute top-5 right-0 gap-5">
        <DeleteFlowButton redirectMode={false} flowId={DraftFlowData.id} userId={DraftFlowData.userId} />
      </div>
    </div>
  )
}



export default DraftPage
