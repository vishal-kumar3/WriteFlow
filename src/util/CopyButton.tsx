"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import { toast } from "sonner"

type props = {
  copyLink: string
  children: React.ReactNode
}

const CopyButton = ({copyLink, children}: props) => {
  return (
    <Button onClick={() => {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}${copyLink}`)
      toast.success("Copied to clipboard")
    }} variant={'ghost'} >
      {children}
    </Button>
  )
}

export default CopyButton
