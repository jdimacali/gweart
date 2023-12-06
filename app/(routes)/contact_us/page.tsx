"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "full name must be at least 1 characters.",
  }),
  email: z
    .string()
    .min(3, {
      message: "email must be at least 2 characters.",
    })
    .email({
      message: "email must be a valid email.",
    }),
  message: z
    .string()
    .min(10, {
      message: "message must be at least 10 characters.",
    })
    .max(300, {
      message: "message must be under 300 characters.",
    }),
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setIsLoading(true);
      alert(`${values.username} ${values.email}, ${values.message}`);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="h-[80vh] w-full dark:bg-gray-800 pb-40 max-sm:pb-20">
      <div className="flex flex-col items-center text-center justify-center text-black dark:text-white  py-20">
        <div className="p-4 mb-6 flex flex-col gap-y-5">
          <h1 className="text-3xl font-[600]">Contact Us</h1>
          <h2 className="opacity-90 text-xl">
            Reach out to us and let us know if there is anything we can do for
            you
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 space-x-1 max-w-[80vw] md:max-w-[50vw] lg:max-w-[40vw] xl:max-w-[30vw] text-black/60 font-semibold dark:text-white"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-6 max-w-[95vw] min-w-[32vw] ml-1 items-center">
                    <FormControl>
                      <Input
                        className="py-7 text-lg dark:focus:border-white focus:border-black dark:hover:border-white hover:border-black border-[#adadad] bg-gray-100/20 dark:bg-inherit rounded-[0.2rem] transition-colors"
                        placeholder="Full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-6 max-w-[95vw] min-w-[32vw] items-center ">
                    <FormControl>
                      <Input
                        className="py-7 text-lg dark:focus:border-white focus:border-black dark:hover:border-white border-[#adadad] hover:border-black bg-gray-100/20 dark:bg-inherit  rounded-[0.2rem] transition-colors "
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-6 max-w-[95vw] min-w-[32vw] items-center">
                    <FormControl>
                      <Textarea
                        className="resize-none text-lg pb-10 dark:focus:border-white focus:border-black dark:hover:border-white hover:border-black border-[#adadad] bg-gray-100/20 dark:bg-inherit  rounded-[0.2rem] transition-colors"
                        placeholder="Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="opacity-60 dark:opacity-30 text-sm">
                      This form is protected by reCAPTCHA and the Google Privacy
                      Policy and Terms of Service apply.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isValid || isLoading}
              type="submit"
              className="dark:bg-amber-700 bg-purple-500 p-6 rounded-xl max-sm:w-full transition-all hover:bg-purple-600 dark:hover:bg-amber-800 hover:opacity-90 mt-8 shadow-2xl"
            >
              <h3 className="text-lg m-3 dark:text-black text-white drop-shadow-2xl">
                Submit
              </h3>
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default Page;
