import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'User Register Form',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
