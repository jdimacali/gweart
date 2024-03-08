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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Clown from "./components/Clown";
import { API_URL } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      axios.post(`${API_URL}/api/contact-emails`, {
        data: {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      });
      toast({ title: "Message Sent!" });
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="flex flex-col items-center justify-center h-full w-full bg-zinc-800 pb-10">
      <div className="p-4 mb-6 flex flex-col gap-y-5 text-white text-center mt-8">
        <h1 className="text-3xl font-[600]">Contact Us</h1>
        <h2 className="opacity-90 text-lg">
          Reach out to us and let us know if there is anything we can do for you
        </h2>
      </div>{" "}
      <Clown>
        <div className="flex flex-col items-center text-center justify-center px-20 text-white pb-8 pt-8 sm:pb-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 space-x-1 max-w-[90vw] md:max-w-[60vw] xl:max-w-[40vw] text-black/60 font-semibold text-white"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-6 max-w-[95vw] min-w-[32vw] ml-1 items-center">
                      <FormControl>
                        <Input
                          className="py-6 text-sm focus:border-white hover:border-white border-[#adadad] bg-inherit rounded-[0.2rem] transition-colors"
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
                          className="py-6 text-sm focus:border-white hover:border-white border-[#adadad] bg-inherit rounded-[0.2rem] transition-colors"
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
                          className="resize-none text-sm pb-8 focus:border-white hover:border-white border-[#adadad] bg-inherit  rounded-[0.2rem] transition-colors"
                          placeholder="Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="opacity-60 dark:opacity-30 text-xs md:text-sm">
                        This form is protected by reCAPTCHA and the Google
                        Privacy Policy and Terms of Service apply.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                disabled={!form.formState.isValid || isLoading}
                type="submit"
                className="bg-amber-700 p-6 rounded-xl max-sm:w-full transition-allhover:bg-amber-800 hover:opacity-90 mt-8 shadow-2xl"
              >
                <h3 className="m-2 font-semibold dark:text-black text-white drop-shadow-2xl">
                  Submit
                </h3>
              </Button>
            </form>
          </Form>
        </div>
      </Clown>
    </section>
  );
};
export default Page;
