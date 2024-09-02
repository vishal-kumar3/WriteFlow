// "use client"
import React from "react";
import { signIn} from 'next-auth/react'
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const SocialLogin = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <CardFooter className="flex flex-col gap-2">
      <Button
        onClick={() => onClick()}
        className="w-full"
        variant={"outline"}
        size={"lg"}
      >
        <FcGoogle />
      </Button>
      {children}
    </CardFooter>
  );
};

export default SocialLogin;
