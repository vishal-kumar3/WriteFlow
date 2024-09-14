"use client"

import React, { useEffect } from "react"
import { Tabs } from "../ui/tabs"

const tabOptions = [
  { label: "UserFlows", value: "UserFlows", alwaysShow: true },
  { label: "DraftFlows", value: "DraftFlows", alwaysShow: false },
  { label: "LikedFlows", value: "LikedFlows", alwaysShow: false },
  { label: "Bookmarks", value: "Bookmarks", alwaysShow: false },
  { label: "History", value: "History", alwaysShow: false },
]

export const TabSwitcherRes = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {

  })

  return (
    <Tabs onValueChange={(e) => console.log(e)} defaultValue="UserFlows">
      {children}
    </Tabs>
  )
}
