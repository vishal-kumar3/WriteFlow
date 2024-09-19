import { updateFlowCoverImage } from "@/actions/image.action"
import { DefaultCoverImage } from "@/app/(main)/user/[userId]/page"
import { auth } from "@/auth"
import DeleteFlowButton from "@/components/RichEditor/DeleteFlowButton"
import RichEditor from "@/components/RichEditor/RichEditor"
import CoverImage from "@/components/UserProfile/CoverImage"
import prisma from "@/prisma"

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

  const fetchFlowData = async (flowId: string) => {
    const data = await prisma.blog.findUnique({
      where: {
        userId: session.user.id,
        id: flowId,
        isPublished: false,
      },
      include: {
        tags: true
      }
    });

    return {
      ...data,
      jsonContent: data?.jsonContent // Assume this is already an object or null
    };
  };

  const DraftFlowData = await fetchFlowData(draftId);

  if (!DraftFlowData) return <div>No draft found</div>

  const processedDraftFlowData = {
    ...DraftFlowData,
    jsonContent: typeof DraftFlowData.jsonContent === 'string'
      ? JSON.parse(DraftFlowData.jsonContent)
      : DraftFlowData.jsonContent,
    id: DraftFlowData.id || '', // Provide a default value if id is undefined
    title: DraftFlowData.title || '', // Similarly for other properties
    userId: DraftFlowData.userId || '',
    updatedAt: DraftFlowData.updatedAt || new Date(),
    tags: DraftFlowData.tags || []
  };


  return (
    <div className="relative py-20 mx-auto w-full sm:max-w-[80%]">
      <CoverImage
        coverImage={DraftFlowData.coverImage || DefaultCoverImage}
        uploadImageAction={updateFlowCoverImage}
        flowId={draftId}
        userId={session.user.id}
        flowMode={true}
      />
      <RichEditor
        {...processedDraftFlowData}
      />
      {/* <Editor initialValue={jsonContent} /> */}
      <div className="absolute top-5 right-0 gap-5">
        <DeleteFlowButton redirectMode={false} flowId={DraftFlowData.id!} userId={DraftFlowData.userId!} />
      </div>
    </div>
  )
}



export default DraftPage
