import React from 'react'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

type props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const DashboardHeader = ({children, title, description}: props) => {
  return (
    <div className="m-10">
      {/* //TODO: Breadcrum here */}
      {/* Breadcrum here */}
      <div className="flex justify-between border-b mb-10">
        <div>
          <p className="text-4xl font-semibold">{title}</p>
          <p className="opacity-50 mt-1 mb-6">{description}</p>
        </div>
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}

export default DashboardHeader
