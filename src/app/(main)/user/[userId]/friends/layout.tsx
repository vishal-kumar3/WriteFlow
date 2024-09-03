import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Friends',
  description: 'Show Followings and Followers',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
