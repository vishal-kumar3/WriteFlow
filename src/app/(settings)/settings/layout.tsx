import SetNav from '@/components/Settings/SetNav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings Page',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex pr-10 py-5 min-h-screen'>
      <div className='flex-[1_1_0%]'>
        <SetNav />
      </div>
      <div className='flex-[3_3_0%]'>
        {children}
      </div>
    </div>
  )
}
