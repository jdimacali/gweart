"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Clown from "./components/Clown";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await axios.post("/api/contact", {
        name: values.name,
        email: values.email,
        message: values.message,
      });
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-zinc-950 via-white/[0.05] to-zinc-950">
      <motion.div
        className="p-4 mb-6 flex flex-col gap-y-5 text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="font-creep text-5xl md:text-6xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Contact Us
        </h1>
        <h2 className="text-gray-400 text-lg md:text-xl tracking-wide">
          Step right up! Don&apos;t be shy, let us know what&apos;s on your mind
        </h2>
      </motion.div>

      <Clown hasError={Object.keys(form.formState.errors).length > 0}>
        <motion.div
          className="w-full max-w-md mx-auto px-6 py-8 rounded-2xl backdrop-blur-sm bg-zinc-900/80
                     shadow-[0_0_15px_rgba(0,0,0,0.3)] relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700 text-gray-100
                                 placeholder:text-gray-500 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700 text-gray-100
                                 placeholder:text-gray-500 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What would you like to tell us?"
                        {...field}
                        className="bg-zinc-800/50 border-zinc-700 text-gray-100 min-h-[120px]
                                 placeholder:text-gray-500 focus:border-gray-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold
                         py-6 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </Clown>
    </section>
  );
};

export default Page;
