"use client";

import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoIosArrowDropdown } from "react-icons/io";

type Props = {
  id: string;
  isCurrentUser: boolean;
  UserFlows: React.ReactNode;
  History?: React.ReactNode;
  LikedFlows?: React.ReactNode;
  Bookmarks?: React.ReactNode;
  DraftFlows?: React.ReactNode;
};

type UserTabContentProps = {
  value: string;
  children: React.ReactNode;
};

const UserTabContent = ({ value, children }: UserTabContentProps) => {
  return (
    <TabsContent
      className="space-x-4 md:space-x-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr"
      value={value}
    >
      {children}
    </TabsContent>
  );
};

const TabSwitcher = ({
  id,
  isCurrentUser,
  UserFlows,
  History,
  LikedFlows,
  Bookmarks,
  DraftFlows,
}: Props) => {
  const [activeTab, setActiveTab] = useState("UserFlows");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tabOptions = [
    { value: "UserFlows", label: "Flows" },
    ...(isCurrentUser
      ? [
          { value: "DraftFlows", label: "Draft Flows" },
          { value: "LikedFlows", label: "Liked Flows" },
          { value: "Bookmarks", label: "Bookmarks" },
          { value: "History", label: "History" },
        ]
      : []),
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsDropdownOpen(false);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <div className="md:hidden mb-4 relative" ref={dropdownRef}>
        <button
          className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-left focus:outline-none "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>
            {tabOptions.find((tab) => tab.value === activeTab)?.label}
          </span>
          <IoIosArrowDropdown className="size-5" />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
            {tabOptions.map((tab) => (
              <button
                key={tab.value}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                onClick={() => handleTabChange(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <TabsList className="flex space-x-2 sm:space-x-4 bg-black/5 dark:bg-black/20 p-2 rounded-lg">
          <TabsTrigger
            className="text-sm sm:text-base whitespace-nowrap"
            value="UserFlows"
          >
            Flows
          </TabsTrigger>
          {isCurrentUser && (
            <>
              <TabsTrigger
                className="text-sm sm:text-base whitespace-nowrap"
                value="DraftFlows"
              >
                Draft Flows
              </TabsTrigger>
              <TabsTrigger
                className="text-sm sm:text-base whitespace-nowrap"
                value="LikedFlows"
              >
                Liked Flows
              </TabsTrigger>
              <TabsTrigger
                className="text-sm sm:text-base whitespace-nowrap"
                value="Bookmarks"
              >
                Bookmarks
              </TabsTrigger>
              <TabsTrigger
                className="text-sm sm:text-base whitespace-nowrap"
                value="History"
              >
                History
              </TabsTrigger>
            </>
          )}
        </TabsList>
      </div>
      <div className="mt-6">
        <UserTabContent value="UserFlows">{UserFlows}</UserTabContent>
        {isCurrentUser && (
          <>
            <UserTabContent value="DraftFlows">{DraftFlows}</UserTabContent>
            <UserTabContent value="History">{History}</UserTabContent>
            <UserTabContent value="LikedFlows">{LikedFlows}</UserTabContent>
            <UserTabContent value="Bookmarks">{Bookmarks}</UserTabContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TabSwitcher;
