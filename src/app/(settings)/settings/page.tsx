"use client"
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import { useRouter } from 'next/navigation'
import React from 'react'

type props = {}

const SettingPage = (props: props) => {
  const router = useRouter()
  router.replace('/settings/account')

  return (
    <DashboardHeader title='Settings' description=''>
      <div className='text-2xl'>
        Nothing here yet
      </div>
    </DashboardHeader>
  )
}

export default SettingPage
