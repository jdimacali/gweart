"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full min-h-[400px] bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <Image
          src="/graveyard.png"
          alt="Graveyard"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link
            href="/"
            className="relative w-20 h-20 opacity-80 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/icon/gwe.png"
              alt="GWE Logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link
              href="/upcoming_events"
              className="hover:text-purple-400 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/contact_us"
              className="hover:text-purple-400 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="https://gweart.square.site/"
              className="hover:text-purple-400 transition-colors"
            >
              Shop
            </Link>
          </div>

          {/* Copyright Text */}
          <div className="text-center space-y-2 mt-8">
            <p className="text-sm text-gray-400">
              © {currentYear} Gweart. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Los Angeles, CA 90042 | Art by Girl Wonder Extraordinaire
            </p>
            <p className="text-xs text-gray-500">
              Specializing in the UnOrdinary | www.artbygwe.com
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 md:block hidden left-20 opacity-30"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/ghost.png"
          width={60}
          height={60}
          alt="ghost"
          className="object-contain brightness-75 mb-10"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-10 md:right-60 opacity-30 scale-x-100"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Image
          src="/ghost.png"
          width={60}
          height={60}
          alt="ghost"
          className="object-contain brightness-75 mb-10 scale-x-[-1]"
        />
      </motion.div>
    </footer>
  );
};

export default Footer;
