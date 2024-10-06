"use client";

import { useState, useEffect, useRef } from "react";
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
    name: "Content Settings",
    href: "/settings/content",
    tab: "content",
  },
];

export default function SetNav() {
  const path = usePathname();
  const tab = path.split("/")[2];
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  // Function to handle clicks outside the sidebar
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Add event listener for clicks outside the sidebar when it's open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-5 p-10 space-y-4">
      {/* Home link and Settings header for larger screens */}
      <div className="hidden lg:flex flex-col">
        <Link href="/" className="flex items-center gap-2 group mb-2">
          <ArrowLeft className="rounded-full cursor-pointer w-8 h-8 p-1 group-hover:bg-white/10 " />
          <div className="flex gap-1">
            <span className="hidden lg:block">Back to</span> Home Page
          </div>
        </Link>
        <div className="text-4xl font-bold">
          Settings
          <hr />
        </div>
      </div>

      {/* Hamburger menu for smaller screens */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="absolute -top-1 left-4 z-50 flex items-center"
        >
          <Menu className="w-8 h-8 p-1 rounded-full hover:bg-white/10 cursor-pointer" />
        </button>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 z-50 bg-white bg-opacity-90 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
        style={{ width: "75%" }} // Adjust width as needed
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Settings Menu</h2>
          <button onClick={toggleSidebar}>
            <Cross className="w-6 h-6 cursor-pointer" /> {/* Cross icon for closing the sidebar */}
          </button>
        </div>
        <div className="flex flex-col gap-4 text-md text-muted-foreground p-10 pt-1">
          {SettingsTabs.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleSidebar} // Close the sidebar on link click
              className={`font-semibold hover:text-primary ${
                tab === item.tab ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* "Back to Home Page" link at the bottom */}
        <div className="absolute bottom-5 left-4 right-4 p-4">
          <Link href="/" className="flex items-center gap-1 group">
            <ArrowLeft className="rounded-full cursor-pointer w-8 h-8 p-2 group-hover:black/10" />
            <div className="flex gap-1">
              <span>Back to</span> Home Page
            </div>
          </Link>
        </div>
      </div>

      {/* This section will not render on smaller screens */}
      <div className="hidden lg:flex flex-col gap-4 text-md text-muted-foreground pl-4">
        {SettingsTabs.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`font-semibold hover:text-primary ${
              tab === item.tab ? "text-primary" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
