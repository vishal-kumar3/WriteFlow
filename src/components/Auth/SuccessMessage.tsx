import React from 'react'
import {CheckCircledIcon} from '@radix-ui/react-icons'

type props = {
  message?: string
}

const SuccessMessage = ({message}: props) => {
  if(!message) return null

  return (
    <div
      className="w-full border border-emerald-600 bg-emerald-500/15 p-3 rounded-md flex gap-2  items-center text-emerald-700 text-md"
    >
      <CheckCircledIcon className="text-2xl" />
      {message}
    </div>
  )
}

export default SuccessMessage