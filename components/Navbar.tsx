"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, MessageCircle, Dumbbell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsChatOpen, useChatActions } from "@/lib/store/chat-store-provider"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const pathname = usePathname()

  // Chat store hooks
  const isChatOpen = useIsChatOpen()
  const { closeChat, openChat } = useChatActions()

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

  const toggleChat = () => {
    if (isChatOpen) {
      closeChat()
    } else {
      openChat()
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
      className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-xl border-b border-surface-border py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-48 md:h-16 md:w-56 transition-transform hover:scale-105">
            {isDark ? (
              <Image
                src="/wellness-dark.svg"
                alt="Wellness Nepal Logo"
                fill
                className="object-contain"
                priority
              />
            ) : (
              <Image
                src="/wellness-light.svg"
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
              className={`font-bebas text-lg tracking-widest transition-colors hover:text-brand-red relative group ${
                pathname === link.path ? "text-brand-red" : "text-surface-text"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="active"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-red"
                  transition={{ type: "spring", bounce: 0.3 }}
                />
              )}
            </Link>
          ))}

          {/* AI Chat Button - DESKTOP */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="group relative flex items-center gap-2 px-6 py-2 font-bebas uppercase tracking-widest text-sm bg-surface-darker/50 hover:bg-brand-red/90 hover:text-white border border-surface-border/50 hover:border-brand-red/50 rounded-xl shadow-lg hover:shadow-brand-red/20 transition-all duration-300"
          >
            <Dumbbell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Ask Shakti</span>
            <div className="absolute inset-0 bg-brand-red/20 -skew-x-12 group-hover:opacity-100 opacity-0 rounded-xl transition-all blur-xl" />
          </motion.button>

          <button
            onClick={toggleTheme}
            className="p-2 border border-surface-border hover:border-brand-red transition-all duration-300 hover:rotate-180 text-surface-text cursor-pointer hover:bg-brand-red/10 rounded-xl"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            href="/contact"
            className="skew-button bg-brand-red px-8 py-2 text-white font-bold hover:bg-surface-text hover:text-surface transition-all shadow-lg shadow-brand-red/20 hover:shadow-xl hover:-skew-x-6 group"
          >
            <span className="skew-x-12 group-hover:skew-x-0 transition-transform">
              INQUIRE
            </span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* AI Chat Button - MOBILE */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="p-2 bg-brand-red/10 hover:bg-brand-red/20 border border-brand-red/30 rounded-xl text-brand-red hover:text-brand-red transition-all group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110" />
          </motion.button>

          <button
            onClick={toggleTheme}
            className="p-2 text-surface-text hover:bg-surface-darker/50 rounded-xl"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="text-surface-text p-2 hover:bg-surface-darker/50 rounded-xl md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-border p-6 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-bebas text-xl py-3 px-4 rounded-xl transition-all ${
                  pathname === link.path
                    ? "bg-brand-red/10 text-brand-red border border-brand-red/30"
                    : "hover:bg-surface-darker/50 text-surface-text"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile AI Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                toggleChat()
                setIsOpen(false)
              }}
              className="font-bebas text-lg py-4 px-6 bg-gradient-to-r from-brand-red to-red-700 text-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-brand-red/50 flex items-center gap-3"
            >
              <Dumbbell className="w-6 h-6" />
              Ask Shakti AI
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
