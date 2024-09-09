import React from 'react'

type props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const DashboardHeader = ({children, title, description}: props) => {
  return (
    <div className="m-10">
      {/* //TODO: Breadcrum here */}
      Breadcrum here
      <div className="border-b mb-10">
        <p className="text-4xl font-semibold">{title}</p>
        <p className="opacity-50 mt-1 mb-6">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

export default DashboardHeader
