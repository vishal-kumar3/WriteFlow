import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login Form for Users',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
