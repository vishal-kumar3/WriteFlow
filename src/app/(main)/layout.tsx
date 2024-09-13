import React from "react";
import AuthUserOnly from "@/util/AuthUserOnly";
import ToggleSidebar from "@/components/Sidebar/ToggleSidebar";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return (
    <div className="relative flex">
      {/* @ts-expect-error Async Server Component */}
      <AuthUserOnly>
        <div className="sticky h-screen overflow-hidden top-0">
          <ToggleSidebar />
        </div>
      </AuthUserOnly>
      <div className="flex-1 pb-5">{children}</div>
    </div>
  );
};

export default layout;
