import React from "react";

type props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: props) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-[95%] sm:w-[75%] md:w-[50%] lg:w-[25%]">{children}</div>
    </div>
  );
};

export default AuthLayout;
