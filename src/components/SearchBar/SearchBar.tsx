"use client"; // Only the search bar needs to be a client component

import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation"; // Client-side routing
import { useState } from "react";
import { UserSearch } from "./UserSearch";

export type SearchBarProps = {
  initialSearch?: string;
};

const SearchBar = ({ initialSearch }: SearchBarProps) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search")?.toString() || "";
    router.push(`/?search=${search}`);
  };

  return (
    <form
      className="sticky bg-background z-10 flex top-0 border-b-2 mt-0 w-full px-10 justify-between items-center h-[60px]"
      onSubmit={handleSearch}
    >
      <div className="flex-1">
        <Input
          name="search"
          className="outline-none max-w-[60%] mx-auto"
          placeholder="Search for Flows..."
          type="text"
          value={search}
          onChange={(e) => {
            // setSearch(e.target.value)
            const key = e.target.value.slice(-1);
            if(key == '@'){
              console.log('at');
              setSearch(e.target.value.slice(0, -1) + 'from:');
            } else{
              setSearch(e.target.value);
            }
          }}
          defaultValue={initialSearch || ""}
        />
        <UserSearch />
      </div>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <Bell />
      </div>
    </form>
  );
};

export default SearchBar;
