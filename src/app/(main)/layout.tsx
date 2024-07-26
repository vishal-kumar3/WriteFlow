import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return (
    <div className="relative flex h-[5000px]">
      <div className="sticky h-screen top-0 min-w-[17%]">
        <Sidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
