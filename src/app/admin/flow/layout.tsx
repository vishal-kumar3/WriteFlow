import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flow Management',
  description: 'Flow Management Page',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
