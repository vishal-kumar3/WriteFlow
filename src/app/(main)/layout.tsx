import React from "react";
import AuthUserOnly from "@/util/AuthUserOnly";
import ToggleSidebar from "@/components/Sidebar/ToggleSidebar";
import MobileBarServer from "@/components/MobileBottomBar.tsx/MobileBarServer";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return (
    <div className="relative flex">
      {/* @ts-expect-error Async Server Component */}
      <AuthUserOnly>
        <div className="sticky z-50 hidden sm:flex h-screen overflow-hidden top-0 bottom-0 left-0">
          <ToggleSidebar />
        </div>
      </AuthUserOnly>
        <div className="fixed z-50 sm:hidden bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <MobileBarServer />
        </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default layout;
