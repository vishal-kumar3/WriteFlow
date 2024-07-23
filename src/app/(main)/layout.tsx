import React from 'react'

type props = {
  children: React.ReactNode
}

const layout = ({children}: props) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout