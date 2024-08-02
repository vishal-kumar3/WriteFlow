"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { useState } from "react";
import { login } from "@/actions/auth.action";

type props = {};

const LoginForm = (props: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setError("");
    setSuccess("");

    const res = await login(data);

    setError(res?.error || "");
    setSuccess(res?.success || "");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome Back!!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email..."
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password..."
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            <Button
              className="w-full bg-black text-white font-semibold"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <SocialLogin>
        <p>
          Don't have an Account?{" "}
          <Link className="text-blue-500" href="/auth/register">
            Sign Up
          </Link>
        </p>
      </SocialLogin>
    </Card>
  );
};

export default LoginForm;
