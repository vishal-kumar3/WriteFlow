"use client"
import Link from 'next/link'
import Image from 'next/image'

type props = {
  icon?: any
  children?: React.ReactNode
  link?: string
  imageUrl?: string
  action?: any
}

const LinkButton = ({icon, action, link, imageUrl, children}: props) => {
  return (
		<Link
      onClick={async() => {
        if(action) {
          "use server"
          await action()
        }
      }}
      key={link} className='transition-all text-sm ease-in hover:bg-[#f5f5f5] dark:hover:bg-white/20 flex items-center gap-3 px-2 py-[5px] rounded-md hover:shadow-lg'
			href={link || "/"}>
		  <div className='flex justify-center'>
		  	<div className='size-[35px] overflow-hidden'></div>
		  	{imageUrl && <Image width={100} height={100} className='size-[35px] rounded-md object-cover object-center' src={imageUrl} alt="dp" />}
		  </div>
		  <p className="w-[100%]">{children}</p>
	  </Link>
  )
}

export default LinkButton
