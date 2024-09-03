import { getFlowWithId } from '@/actions/flow.action';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { draftId: string } }): Promise<Metadata> {
  const draftId = params.draftId;
  console.log(draftId)
  // Simulate fetching the blog data by ID (replace with actual fetching logic)
  const { error, data } = await getFlowWithId(draftId)

  return {
    title: error || data?.title + ' ( Draft )' || 'Draft title',
    description: error || data?.description + ' ( Draft )' || 'Draft description',
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
