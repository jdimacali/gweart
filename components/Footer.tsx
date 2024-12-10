"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { routes } from "./Navbar"; // Import routes from Navbar

// Ghost animation variants
const ghostAnimation = {
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

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

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
            {routes.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-purple-400 transition-colors"
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {label}
              </Link>
            ))}
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

      {/* Decorative Ghosts */}
      {[
        { position: "left-20", delay: 0 },
        { position: "right-10 md:right-60", delay: 1, flip: true },
      ].map((ghost, index) => (
        <motion.div
          key={index}
          className={`absolute bottom-0 md:block hidden ${ghost.position} opacity-20`}
          variants={ghostAnimation}
          animate="float"
          transition={{
            ...ghostAnimation.float.transition,
            delay: ghost.delay,
          }}
        >
          <Image
            src="/ghost.png"
            width={60}
            height={60}
            alt="ghost"
            className={`object-contain brightness-75 mb-10 ${
              ghost.flip ? "scale-x-[-1]" : ""
            }`}
          />
        </motion.div>
      ))}
    </footer>
  );
};

export default Footer;
