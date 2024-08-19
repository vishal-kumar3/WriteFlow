"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

type props = {
  icon?: any
  link?: string
  imageUrl?: string
  action?: any
  children: React.ReactNode
}

const LinkButton = ({ icon, action, link, imageUrl, children }: props) => {
  return (
    <Link
      onClick={async () => {
        if (action) {
          "use server"
          await action()
        }
      }}
      key={link} className='transition-all h-[45px] text-sm ease-in hover:bg-[#f5f5f5] dark:hover:bg-white/20 px-6 py-[5px] rounded-md hover:shadow-lg'
      href={link || "/"}
    >
      <div className='size-[35px] md:mr-4 flex items-center justify-center float-left overflow-hidden'>
        {icon && icon}
        {imageUrl && <Image src={imageUrl} alt="Profile Image" width={35} height={35} className="rounded-lg w-full h-full object-cover object-center" />}
      </div>
      <div className="h-full flex items-center">{children}</div>
    </Link>
  )
}

export type SideButtonProps = {
  icon?: any
  link?: string
  imageUrl?: string
  action?: any
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export const SideButton = ({ icon, action, imageUrl, children, className, showIcon }: SideButtonProps) => {
  return (
    <>
      <button
        onClick={async () => {
          if (action) {
            "use server"
            await action()
          }
        }}
        className={cn(
          'transition-all h-[45px] w-full text-sm ease-in hover:bg-[#f5f5f5] dark:hover:bg-white/20 px-6 py-[5px] rounded-md hover:shadow-lg',
          !showIcon && "text-start",
          className
        )}
      >
        {
          !showIcon && (
            <div className='size-[35px] md:mr-4 flex items-center justify-center float-left overflow-hidden'>
              {icon && icon}
              {imageUrl && <Image src={imageUrl} alt="Profile Image" width={35} height={35} className="rounded-lg w-full h-full object-cover object-center" />}
            </div>
          )
        }
        <div className="h-full flex items-center">{children}</div>
      </button>
    </>
  )
}

export default LinkButton
