'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiHome, FiSearch, FiHeart, FiUser } from 'react-icons/fi'
import Link from 'next/link'
import { ChartNoAxesCombinedIcon, NotebookPen } from 'lucide-react'
import CreateFlowForm from '../form/CreateFlowForm'
import { User } from '@/types/UserType'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

/**
 * Profile Link ( User required!! )
 * Feed '/'
 * create flow button
 * Friends /user/id/friends
 * Search Users /user/search
 * Dashboard /user/dashboard
 *
 * FiHome Feed
 * Handshake Friends
 * UserSearch Search
 * ChartNoAxesCombinedIcon Dashboard
*/


export default function MobileBar({user}: {user: User}) {
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useIsMobile()

  if (!isMobile) return null

  const tabsLeft = [
    { icon: FiHome, label: 'Home', href: '/', index: 0 },
    { icon: FiUser, label: 'Profile', href: user ? `/user/${user?.id}` : '/auth/login', index: 1 },
  ]

  const createFlowTab = {
    icon: NotebookPen,
    label: 'Create Flow',
    mobile: true,
  }

  const tabsRight = [
    { icon: FiSearch, label: 'Search', href: user ? '/user/search' : '/auth/login', index: 3 },
    { icon: ChartNoAxesCombinedIcon, label: 'Dashboard', href: user ? '/user/dashboard' : '/auth/login', index: 4 },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <ul className="flex h-full items-center justify-around">
        {tabsLeft.map((tab) => (
          <li key={tab.label} className="relative flex-1 h-full">
            <Link
              href={tab.href}
              className="flex flex-col items-center justify-center h-full w-full"
              onClick={() => setActiveTab(tab.index)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <tab.icon
                  className={`w-6 h-6 ${activeTab === tab.index
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                    }`}
                />
              </motion.div>
              <span
                className={`text-xs mt-1 ${activeTab === tab.index
                  ? 'text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                {tab.label}
              </span>
            </Link>
            {activeTab === tab.index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
        {
          user && (
            <CreateFlowForm title="Create Flow" mobile={createFlowTab} />
          )
        }
        {tabsRight.map((tab) => (
          <li key={tab.label} className="relative flex-1 h-full">
            <Link
              href={tab.href}
              className="flex flex-col items-center justify-center h-full w-full"
              onClick={() => setActiveTab(tab.index)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <tab.icon
                  className={`w-6 h-6 ${activeTab === tab.index
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                    }`}
                />
              </motion.div>
              <span
                className={`text-xs mt-1 ${activeTab === tab.index
                  ? 'text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                {tab.label}
              </span>
            </Link>
            {activeTab === tab.index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-black dark:bg-white"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
