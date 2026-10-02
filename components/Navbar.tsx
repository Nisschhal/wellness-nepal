"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Building2,
  ChevronRight,
  Dumbbell,
  Info,
  LayoutGrid,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react"
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
    { name: "Products", path: "/category", icon: LayoutGrid },
    { name: "Our Work", path: "/portfolio", icon: Building2 },
    { name: "About Us", path: "/about", icon: Info },
  ]

  const iconBtn =
    "flex size-10 items-center justify-center border border-surface-border bg-surface-darker/60 text-surface-text transition-colors hover:border-brand-red hover:text-brand-red"

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-surface/85 backdrop-blur-xl border-b border-surface-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 md:h-20 flex justify-between items-center gap-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0" aria-label="WN Wellness Gym Equipment Nepal home">
          <div className="relative h-9 w-40 md:h-11 md:w-48 transition-transform hover:scale-[1.03] active:scale-95">
            <Image
              src="/logo-dark.png"
              alt="Wellness Nepal"
              fill
              sizes="192px"
              className="hidden object-contain object-left dark:block"
              priority
            />
            <Image
              src="/logo-light.png"
              alt=""
              fill
              sizes="192px"
              className="object-contain object-left dark:hidden"
              priority
            />
          </div>
        </Link>

        {/* DESKTOP NAV (Hidden on Tablet/Mobile) */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.path)
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 font-bebas text-xl tracking-[0.08em] uppercase transition-colors hover:text-brand-red after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brand-red after:origin-left after:transition-transform ${
                    active
                      ? "text-brand-red after:scale-x-100"
                      : "text-surface-text after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* AI BUTTON - DESKTOP */}
            <button
              onClick={toggleChat}
              aria-label="Open WN AI assistant"
              className="group flex h-10 items-center gap-2 border border-surface-border bg-surface-darker/60 px-4 font-bebas text-lg uppercase tracking-wider text-surface-text transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <span className="relative">
                <Dumbbell className="size-[18px] group-hover:rotate-45 transition-transform duration-500" />
                <Sparkles className="size-2.5 absolute -top-1 -right-1.5 text-brand-red animate-pulse" />
              </span>
              WN AI
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={iconBtn}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="skew-button h-10 bg-brand-red px-6 text-white font-bold text-sm uppercase tracking-widest hover:bg-surface-text hover:text-surface shadow-lg shadow-brand-red/20"
            >
              <span>CONTACT US</span>
            </Link>
          </div>
        </div>

        {/* TABLET/MOBILE ACTIONS */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleChat}
            aria-label="Open WN AI assistant"
            className="flex size-10 items-center justify-center bg-brand-red text-white shadow-lg shadow-brand-red/30 active:scale-95 transition-transform"
          >
            <Sparkles size={18} />
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={iconBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 md:top-20 bg-surface z-50 px-6 py-8 flex flex-col gap-8 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col">
              <p className="text-surface-muted font-semibold text-xs tracking-[0.25em] uppercase pb-3 border-b border-surface-border">
                Menu
              </p>
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.path)
                const Icon = link.icon
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-14 items-center gap-4 border-b border-surface-border font-bebas text-3xl tracking-wider transition-colors ${
                      active ? "text-brand-red" : "text-surface-text hover:text-brand-red"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} className="text-brand-red" />
                    {link.name}
                    <ChevronRight size={18} className="ml-auto text-surface-muted" />
                  </Link>
                )
              })}
            </div>

            <div className="mt-auto grid gap-3">
              <button
                onClick={() => {
                  toggleChat()
                  setIsOpen(false)
                }}
                className="flex h-14 w-full items-center justify-center gap-3 border border-surface-border bg-surface-darker font-bebas text-2xl tracking-widest text-surface-text"
              >
                <Sparkles size={20} className="text-brand-red" />
                ASK WN AI
              </button>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex h-14 w-full items-center justify-center bg-brand-red font-bebas text-2xl tracking-widest text-white"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
