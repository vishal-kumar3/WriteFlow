"use client"

import { ArrowLeft, StepBack } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaBackward } from "react-icons/fa6"

const SettingsTabs = [
  {
    name: "Account Settings",
    href: "/settings/account",
    tab: "account",
  },
  // {
  //   name: "Privacy & Security",
  //   href: "/settings/privacy",
  //   tab: "privacy",
  // },
  {
    name: "Content Settings",
    href: "/settings/content",
    tab: "content",
  },
  // {
  //   name: "Notifications",
  //   href: "/settings/notification",
  //   tab: "notification",
  // },
  // {
  //   name: "Reports",
  //   href: "/settings/reports",
  //   tab: "reports",
  // },
  // {
  //   name: "Appearance",
  //   href: "/settings/appearance",
  //   tab: "appearance",
  // },
  // {
  //   name: "Security Logs",
  //   href: "/settings/security",
  //   tab: "security",
  // },
]


export default function SetNav() {
  const path = usePathname()
  const tab = path.split("/")[2]

  return (
    <nav className="sticky top-5 p-10 space-y-4">
      <Link href="/" className="flex items-center gap-2 group">
        <ArrowLeft className="rounded-full cursor-pointer w-8 h-8 p-1 group-hover:bg-white/10 " />
        <div className="flex gap-1"><span className="hidden lg:block">Back to</span> Home Page</div>
      </Link>
      <div className="text-4xl font-bold">
        Settings
        <hr />
      </div>
      <div className="flex flex-col gap-4 text-md text-muted-foreground pl-4">
        {
          SettingsTabs.map((item, index) => (
            <Link key={index} href={item.href} className={`font-semibold hover:text-primary ${tab === item.tab ? "text-primary" : ""}`}>
              {item.name}
            </Link>
          ))
        }
      </div>
    </nav>
  )
}
