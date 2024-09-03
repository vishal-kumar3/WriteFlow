import { getUserById } from '@/data/user';
import type { Metadata } from 'next';

export async function generateMetadata({params}: {params: {userId: string}}): Promise<Metadata> {

  const userId = params.userId;

  const user = await getUserById(userId);

  return {
    title: '@'+user?.username || 'Error while fetching user',
    description: 'Username',
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
