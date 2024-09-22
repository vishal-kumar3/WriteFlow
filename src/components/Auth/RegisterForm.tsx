"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/lib/schema";
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
import Link from "next/link";
import SocialLogin from "./SocialLogin";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { register } from "@/actions/auth.action";
import { useState } from "react";

type props = {};

const RegisterForm = (props: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    setError("");
    setSuccess("");

    const res = await register(data);

    if (res?.success) form.reset()
    setLoadingButton(true)
    if (res?.error) setLoadingButton(false)
    setError(res?.error || "");
    setSuccess(res?.success || "");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Register yourself to get started!!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
                      disabled={form.formState.isSubmitting || loadingButton}
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
                      placeholder="Enter your password..."
                      disabled={form.formState.isSubmitting || loadingButton}
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
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <SocialLogin>
        <p>
          Already registered?{" "}
          <Link className="text-blue-500" href="/auth/login">
            Sign In
          </Link>
        </p>
      </SocialLogin>
    </Card>
  );
};

export default RegisterForm;
