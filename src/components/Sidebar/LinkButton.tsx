import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type props = {
  icon?: any
  children?: React.ReactNode
  link?: string
  imageUrl?: string
}

const LinkButton = ({icon, link, imageUrl, children}: props) => {
  return (
		<Link key={link} className='transition-all text-sm ease-in hover:bg-[#f5f5f5] flex items-center gap-3 px-2 py-[5px] rounded-md hover:shadow-lg' 
			href={link || "/"}>
		  <div className='flex justify-center'>
		  	<div className='size-[30px]'></div>
		  	{imageUrl && <Image width={100} height={100} className='size-[30px] rounded-md object-cover object-center' src={imageUrl} alt="dp" />}
		  </div>
		  <p className="w-[100%]">{children}</p>
	  </Link>
  )
}

export default LinkButton
