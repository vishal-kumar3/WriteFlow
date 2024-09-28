"use client";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Bell, LogOut, SearchIcon, Settings } from "lucide-react";
import { useRouter } from "next/navigation"; // Client-side routing
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { User } from "@/types/UserType";
import { signOut } from "next-auth/react";
import { DefaultAvatarImage } from "@/app/(main)/user/[userId]/page";
import Image from "next/image";
import { Button } from "../ui/button";

export type SearchBarProps = {
  initialSearch?: string;
  user: User
};

const SearchBar = ({ initialSearch, user }: SearchBarProps) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  const UserOptions = [
    // {
    //   icon: <Bell className="w-4" />,
    //   href: "/notifications",
    //   label: "Notifications",
    // },
    {
      icon: <Settings className="w-4" />,
      href: "/settings",
      label: "Settings",
      onClick: () => console.log("Settings"),
    },
    {
      icon: <LogOut className="w-4" />,
      href: "",
      label: "Logout",
      onClick: async() => await signOut(),
    }
  ]

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search")?.toString() || "";
    router.push(`/?search=${search}`);
  };

  return (
    <form
      className="sticky bg-background z-10 flex top-0 border-b-2 mt-0 w-full px-2 md:px-10 justify-between items-center h-[60px]"
      onSubmit={handleSearch}
    >
      {
        !user && (
          <Link href='/' className="mx-auto">
            <Image src='/writeflow.svg' alt="Write Flow" className="hidden md:flex w-[150px] h-[20px]" width={10} height={10} />
            <Image src='/logo.svg' alt="Write Flow" className="md:hidden flex w-[50px] h-[30px]" width={10} height={10} />
          </Link>
        )
      }
      <div className=" flex-1 mr-2">
        <div className="relative md:max-w-[60%] mx-auto">
          <Input
            name="search"
            className="outline-none flex-1"
            placeholder="Search for Flows..."
            type="text"
            value={search}
            // onChange={(e) => {
            //   setSearch(e.target.value)
            //   const key = e.target.value.slice(-1);
            //   if(key == '@'){
            //     console.log('at');
            //     setSearch(e.target.value.slice(0, -1) + 'from:');
            //   } else{
            //     setSearch(e.target.value);
            //   }
            // }}
            defaultValue={initialSearch || ""}
          />
          <Button type="submit" className="absolute w-fit top-0 right-0 bottom-0 backdrop-blur-sm" variant='ghost'>
            <SearchIcon />
          </Button>

        </div>
        {/* <UserSearch /> */}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {
          user ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={user.image || DefaultAvatarImage} className="object-center object-cover" alt={user.name!} />
                  <AvatarFallback>
                    <span className="text-sm font-medium text-white">
                      {/* if name if separated by space then it will show first letter of each word else two letters of the worrd */}
                      {user?.name?.split(" ").map((word, index) => (
                        <React.Fragment key={index}>
                          {word[0]}
                        </React.Fragment>
                      ))}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit flex flex-col p-2">
                {UserOptions.map((option) => (
                  <Link
                    href={option.href}
                    key={option.label}
                    onClick={option.onClick}
                    className="flex gap-2 text-sm items-center transition-all ease-in-out duration-200 hover:bg-black/20 hover:dark:bg-white/20 p-2 rounded-md"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </Link>
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-400 p-1 px-3 rounded-lg"
            >Login</Link>
          )
        }

      </div>
    </form>
  );
};

export default SearchBar;
