"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthProvider";
import { setToken } from "@/lib/helpers";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(320, "Email cannot exceed 320 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        toast({ title: `Welcome back ${data.user.username}!` });
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast({ title: error?.message ?? "Something went wrong!" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[85vh] max-sm:mt-[-4rem] w-full bg-zinc-200 dark:bg-gray-800 flex justify-center">
      <div>
        <div className="flex-1 max-sm:h-full flex flex-col items-start justify-center sm:pt-20 p-4">
          <div>
            <h1 className="text-xl font-semibold mb-6">Sign In</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[500px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className=" dark:focus:border-white focus:border-black dark:hover:border-white hover:border-black border-[#adadad] bg-gray-100/20 dark:bg-inherit rounded-[0.2rem] transition-colors"
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
                    <FormLabel className="text-md">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className=" dark:focus:border-white focus:border-black dark:hover:border-white hover:border-black border-[#adadad] bg-gray-100/20 dark:bg-inherit rounded-[0.2rem] transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={!form.formState.isValid || isLoading}
                type="submit"
                className="w-full rounded-[0.2rem] transition-all dark:hover:bg-amber-800 hover:opacity-90 shadow-2xl dark:bg-amber-700 bg-purple-500 hover:bg-purple-600"
              >
                <h3 className="text-lg text-white"> Sign In </h3>
              </Button>
              <div>
                Don&apos;t have an account?
                <span className="dark:text-orange-500 text-purple-500 hover:text-purple-800 ml-1">
                  <Link href="sign-up">Sign Up</Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
