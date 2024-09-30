import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin User Management',
  description: 'Admin User Management Page',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
