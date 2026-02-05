"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Dumbbell, Sparkles, Cpu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsChatOpen, useChatActions } from "@/lib/store/chat-store-provider"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  const isChatOpen = useIsChatOpen()
  const { closeChat, openChat } = useChatActions()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    // Check initial theme
    setIsDark(document.documentElement.classList.contains("dark"))
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    document.documentElement.classList.toggle("dark")
  }

  const toggleChat = () => (isChatOpen ? closeChat() : openChat())

  const navLinks = [
    { name: "Iron Arsenal", path: "/category" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blueprint", path: "/about" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-surface-border py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-10 w-40 md:h-14 md:w-52 transition-transform hover:scale-105 active:scale-95">
            <Image
              src={isDark ? "/wellness-dark.svg" : "/wellness-light.svg"}
              alt="Wellness Nepal"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* DESKTOP NAV (Hidden on Tablet/Mobile) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-bebas text-xl tracking-[0.1em] transition-all hover:text-brand-red uppercase italic ${
                pathname === link.path ? "text-brand-red" : "text-surface-text"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* AI BUTTON - DESKTOP */}
          <button
            onClick={toggleChat}
            className="relative flex items-center gap-3 px-6 py-2 font-bebas italic uppercase tracking-wider text-lg bg-surface-darker border-2 border-surface-border hover:border-brand-red transition-all group overflow-hidden skew-x-[-12deg]"
          >
            <div className="flex items-center gap-2 skew-x-[12deg] relative z-10">
              <div className="relative">
                <Dumbbell className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-brand-red animate-pulse" />
              </div>
              <span className="group-hover:text-brand-red">SHAKTI AI</span>
            </div>
            {/* Hover Glitch Effect Background */}
            <div className="absolute inset-0 bg-brand-red/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-surface-border hover:border-brand-red text-surface-text transition-colors rounded-lg bg-surface-darker/50"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="skew-button bg-brand-red px-8 py-2.5 text-white font-bold text-xl uppercase tracking-widest hover:bg-surface-text hover:text-surface transition-all shadow-xl shadow-brand-red/20"
          >
            <span>INQUIRE</span>
          </Link>
        </div>

        {/* TABLET/MOBILE ACTIONS */}
        <div className="flex lg:hidden items-center gap-3">
          {/* AI MINI BUTTON */}
          <button
            onClick={toggleChat}
            className="p-2.5 bg-brand-red text-white rounded-lg shadow-lg relative active:scale-90 transition-transform"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 border border-surface-border text-surface-text rounded-lg"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="p-2.5 bg-surface-darker border border-surface-border text-surface-text rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[73px] md:top-[89px] bg-surface/98 backdrop-blur-2xl z-50 p-8 flex flex-col gap-8 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <p className="text-surface-muted font-black text-[10px] tracking-[0.5em] uppercase border-b border-surface-border pb-2">
                Navigation Arsenal
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-bebas text-4xl italic tracking-widest transition-all ${
                    pathname === link.path
                      ? "text-brand-red pl-4"
                      : "text-surface-text hover:pl-4 hover:text-brand-red"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <button
                onClick={() => {
                  toggleChat()
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-center gap-4 py-6 bg-brand-red text-white font-bebas text-3xl italic tracking-widest skew-x-[-6deg]"
              >
                <div className="skew-x-[6deg] flex items-center gap-3">
                  <Sparkles size={24} />
                  <span>CONSULT SHAKTI AI</span>
                </div>
              </button>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center py-6 border-2 border-surface-text text-surface-text font-bebas text-3xl italic tracking-widest skew-x-[-6deg]"
              >
                <span className="skew-x-[6deg]">GET PROJECT QUOTE</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
