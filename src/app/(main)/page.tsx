import React from "react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Bell } from "lucide-react";
import HomeFlowCard from "@/components/Home/HomeFlowCard";
import RightSidebar from "@/components/RightSidebar/RightSidebar";

type props = {};

const page = (props: props) => {
  return (
    <div className="relative w-full">
      <form className="sticky z-10 flex top-0 border-b-2 mt-0 w-full px-10 justify-between items-center h-[60px]">
        <Input
          className="outline-none max-w-[60%] mx-auto"
          placeholder="Search for Flows..."
          type="text"
        />

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Bell />
        </div>
      </form>

      <div className="flex">
        <div className="max-w-[70%]">
          <HomeFlowCard />
          <HomeFlowCard />
          <HomeFlowCard />
          <HomeFlowCard />
        </div>
        <RightSidebar />
      </div>

    </div>
  );
};

export default page;
