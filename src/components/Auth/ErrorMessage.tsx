import React from 'react'
import { CiWarning } from "react-icons/ci";

type props = {
  message?: string
}

const ErrorMessage = ({message}: props) => {
  if(!message) return null

  return (
    <div
      className="w-full border border-destructive bg-destructive/15 p-3 rounded-md flex gap-2  items-center text-destructive text-md"
    >
      <CiWarning className="text-2xl" />
      {message}
    </div>
  )
}

export default ErrorMessage