import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flows and Drafts',
  description: 'Show Flows and Drafts',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
