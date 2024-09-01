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
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

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
    setLoadingButton(true)
    if(res?.error) setLoadingButton(false)
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
              className="w-full bg-black text-white font-semibold dark:disabled:bg-black/50 disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="submit"
              disabled={form.formState.isSubmitting || loadingButton}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <SocialLogin>
        <p>
          Don&apos;t have an Account?{" "}
          <Link className="text-blue-500" href="/auth/register">
            Sign Up
          </Link>
        </p>
      </SocialLogin>
    </Card>
  );
};

export default LoginForm;
