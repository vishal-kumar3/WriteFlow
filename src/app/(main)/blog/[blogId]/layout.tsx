import { getFlowWithId } from '@/actions/flow.action';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { blogId: string } }): Promise<Metadata> {
  const blogId = params.blogId;
  // Simulate fetching the blog data by ID (replace with actual fetching logic)
  const {error, data} = await getFlowWithId(blogId)

  return {
    title: error || data?.title || 'Blog title',
    description: error || data?.description || 'Blog description',
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
