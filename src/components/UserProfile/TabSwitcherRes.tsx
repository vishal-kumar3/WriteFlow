"use client"

import React from "react"
import { Tabs } from "../ui/tabs"

export const TabSwitcherRes = ({children}: {children: React.ReactNode}) => {
    return (
        <Tabs onValueChange={(e) => console.log(e)} defaultValue="UserFlows">
            {children}
        </Tabs>
    )
}
