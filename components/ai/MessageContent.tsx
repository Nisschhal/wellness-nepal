"use client"
import React, { useState } from "react"
import Link from "next/link"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ChevronDown, Dumbbell, Link as LinkIcon } from "lucide-react"

interface MessageContentProps {
  content: string
  closeChat: () => void
  isUser: boolean
}

export function MessageContent({
  content,
  closeChat,
  isUser,
}: MessageContentProps) {
  const handleCloseChat = () => {
    if (window.matchMedia("(max-width: 767px)").matches) closeChat()
  }

  return (
    <div className="font-montserrat prose-img:rounded-xl">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // HYDRATION FIX: Use 'div' instead of 'p'
          p: ({ children }) => (
            <div className="mb-4 last:mb-0 leading-relaxed font-medium">
              {children}
            </div>
          ),

          // UI/UX: Render H2 as a "Collapsible Industrial Plate"
          h2: ({ children }) => (
            <details className="group mb-4 border border-brand-red/20 rounded-lg overflow-hidden bg-surface-darker/30">
              <summary className="flex items-center justify-between p-3 cursor-pointer list-none bg-brand-red/5 hover:bg-brand-red/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Dumbbell size={16} className="text-brand-red -rotate-45" />
                  <h2 className="font-bebas text-xl tracking-wider text-brand-red m-0 uppercase">
                    {children}
                  </h2>
                </div>
                <ChevronDown
                  size={18}
                  className="text-brand-red group-open:rotate-180 transition-transform duration-300"
                />
              </summary>
              <div className="p-4 border-t border-brand-red/10 bg-black/20 animate-in fade-in slide-in-from-top-2">
                {/* Content inside the details will be handled by the rest of the markdown components */}
                {children}
              </div>
            </details>
          ),

          // UI/UX: Render H3 as a "Sub-header with Anchor"
          h3: ({ children }) => (
            <div
              className="flex items-center gap-2 mb-3 mt-6 group cursor-pointer"
              onClick={() => {
                const id = children
                  ?.toString()
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                window.location.hash = id || ""
              }}
            >
              <div className="h-px flex-1 bg-brand-red/20" />
              <h3 className="font-bebas text-lg tracking-wide text-surface-text m-0 uppercase flex items-center gap-2">
                {children}
                <LinkIcon
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-red"
                />
              </h3>
              <div className="h-px w-8 bg-brand-red/20" />
            </div>
          ),

          // TABLE: Industrial style
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-white/5 bg-zinc-900/40">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-brand-red/10 p-3 font-bebas text-brand-red uppercase tracking-widest border-b border-brand-red/20">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 border-b border-white/5 opacity-80 font-medium">
              {children}
            </td>
          ),

          // IMAGE: Premium Card style
          img: ({ src, alt }) => (
            <div className="my-6 overflow-hidden rounded-xl border-2 border-brand-red/20 bg-zinc-900 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <img
                src={src}
                alt={alt}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
              {alt && (
                <div className="bg-brand-red/10 p-3 text-[10px] uppercase font-black italic text-brand-red tracking-widest border-t border-brand-red/20 flex justify-between items-center">
                  <span>LOGISTICAL INTEL: {alt}</span>
                  <span className="px-2 py-0.5 border border-brand-red/30 rounded text-[8px]">
                    SHAKTI PRO
                  </span>
                </div>
              )}
            </div>
          ),

          // YOUR ORIGINAL LINKS & CODE
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>
            const classes = `font-bold underline underline-offset-4 decoration-brand-red/40 transition-all ${isUser ? "text-red-400" : "text-brand-red"}`
            if (href.startsWith("/"))
              return (
                <Link href={href} onClick={handleCloseChat} className={classes}>
                  {children}
                </Link>
              )
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                {children}
              </a>
            )
          },

          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-sm font-medium opacity-90">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="pl-2 leading-relaxed">{children}</li>
          ),

          code: ({ children, className }) => {
            const isInline = !className
            return isInline ? (
              <code className="px-2 py-0.5 rounded bg-brand-red/10 text-brand-red font-mono text-xs font-bold border border-brand-red/20">
                {children}
              </code>
            ) : (
              <code className="block p-4 bg-zinc-900/50 rounded-xl font-mono text-xs border border-white/5 overflow-x-auto">
                {children}
              </code>
            )
          },

          strong: ({ children }) => (
            <strong className="font-black text-white tracking-tight">
              {children}
            </strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="pl-4 py-1 my-4 border-l-4 border-brand-red/40 bg-brand-red/5 italic opacity-80 text-sm">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
