import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import AuthUserOnly from "@/util/AuthUserOnly";

type props = {
  children: React.ReactNode;
};

const layout = ({ children }: props) => {
  return (
    <div className="relative flex">
      {/* @ts-expect-error Async Server Component */}
      <AuthUserOnly>
        <div className="sticky h-screen top-0 min-w-[17%]">
          <Sidebar />
        </div>
      </AuthUserOnly>
      <div className="w-full pb-5">{children}</div>
    </div>
  );
};

export default layout;
