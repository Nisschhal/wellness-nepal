"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image" // Import Next.js Image component
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    setIsDark(document.documentElement.classList.contains("dark"))
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Equipment", path: "/category" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-xl border-b border-surface-border py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-48 md:h-16 md:w-56 transition-transform hover:scale-105">
            {/* If you have different logos for dark/light mode */}
            {isDark ? (
              <Image
                src="/wellness-dark.svg" // Put your dark mode logo here
                alt="Wellness Nepal Logo"
                fill
                className="object-contain"
                priority
              />
            ) : (
              <Image
                src="/wellness-light.svg" // Put your light mode logo here
                alt="Wellness Nepal Logo"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-bebas text-lg tracking-widest transition-colors hover:text-brand-red ${
                pathname === link.path ? "text-brand-red" : "text-surface-text"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 border border-surface-border hover:border-brand-red transition-colors text-surface-text cursor-pointer"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/contact"
            className="skew-button bg-brand-red px-8 py-2 text-white font-bold hover:bg-surface-text hover:text-surface transition-all shadow-lg shadow-brand-red/20"
          >
            <span>INQUIRE</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-surface-text">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="text-surface-text"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-surface border-b border-surface-border p-6 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-bebas text-xl ${
                  pathname === link.path
                    ? "text-brand-red"
                    : "text-surface-text"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
