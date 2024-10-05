"use client";

import { useState } from "react";
import { ArrowLeft, Menu, X as Cross } from "lucide-react"; // Import Cross for the close button
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsTabs = [
  {
    name: "Account Settings",
    href: "/settings/account",
    tab: "account",
  },
  {
    name: "Privacy & Security",
    href: "/settings/privacy",
    tab: "privacy",
  },
  {
    name: "Content Settings",
    href: "/settings/content",
    tab: "content",
  },
  {
    name: "Notifications",
    href: "/settings/notification",
    tab: "notification",
  },
  {
    name: "Reports",
    href: "/settings/reports",
    tab: "reports",
  },
  {
    name: "Appearance",
    href: "/settings/appearance",
    tab: "appearance",
  },
  {
    name: "Security Logs",
    href: "/settings/security",
    tab: "security",
  },
];

export default function SetNav() {
  const path = usePathname();
  const tab = path.split("/")[2];
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  return (
    <nav className="sticky top-5 p-10 space-y-4">
      {/* Home link and Settings header for larger screens */}
      <div className="hidden lg:flex flex-col">
        <Link href="/" className="flex items-center gap-2 group mb-2">
          <ArrowLeft className="rounded-full cursor-pointer w-8 h-8 p-1 group-hover:bg-white/10 " />
          <div className="flex gap-1"><span className="hidden lg:block">Back to</span> Home Page</div>
        </Link>
        <div className="text-4xl font-bold">Settings<hr /></div>
      </div>

      {/* Hamburger menu for smaller screens */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleSidebar} className="flex items-center">
          <Menu className="w-8 h-8 p-1 rounded-full hover:bg-white/10 cursor-pointer" />
        </button>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed inset-0 z-50 bg-white bg-opacity-90 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
        style={{ width: '75%' }} // Adjust width as needed
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Settings Menu</h2>
          <button onClick={toggleSidebar}>
            <Cross className="w-6 h-6 cursor-pointer" /> {/* Cross icon for closing the sidebar */}
          </button>
        </div>
        <div className="flex flex-col gap-4 text-md text-muted-foreground p-10">
          {SettingsTabs.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleSidebar} // Close the sidebar on link click
              className={`font-semibold hover:text-primary ${tab === item.tab ? "text-primary" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* This section will not render on smaller screens */}
      <div className="hidden lg:flex flex-col gap-4 text-md text-muted-foreground pl-4">
        {SettingsTabs.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`font-semibold hover:text-primary ${tab === item.tab ? "text-primary" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
