import { updateFlowCoverImage } from "@/actions/image.action"
import { DefaultCoverImage } from "@/app/(main)/user/[userId]/page"
import { auth } from "@/auth"
import RichEditor from "@/components/RichEditor/RichEditor"
import CoverImage from "@/components/UserProfile/CoverImage"
import prisma from "@/prisma"

type props = {
  params: {
    draftId: string
  }
}

const page = async ({ params }: props) => {
  const { draftId } = params
  if (!draftId) return <div>No draft id provided</div>

  const session = await auth()
  if (!session) return <div>User not logged in</div>

  const DraftFlowData = await prisma.blog.findUnique({
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
    </div>
  )
}



export default page
