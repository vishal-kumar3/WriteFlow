"use client"

type props = {
  children: React.ReactNode
  icon?: any
}

const SidebarButton = ({children}: props) => {
  return (
    <button
      
      className="transition-all text-sm ease-in hover:bg-[#f5f5f5] dark:hover:bg-white/20 flex items-center gap-3 px-2 py-[5px] rounded-md hover:shadow-lg"
    >
      <div className="flex justify-center">
        <div className="size-[35px] overflow-hidden">
          Icon Here
        </div>
        <p className="w-[100%]">{children}</p>
      </div>
    </button>
  )
}

export default SidebarButton
