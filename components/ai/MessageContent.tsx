"use client"
import React from "react"
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
          // Use theme variables for text and spacing
          p: ({ children }) => (
            <div className="mb-4 last:mb-0 leading-relaxed font-medium text-surface-text/90">
              {children}
            </div>
          ),

          // H2: The Collapsible Plate (Uses brand-red and surface-darker)
          h2: ({ children }) => (
            <details className="group mb-4 border border-brand-red/20 rounded-lg overflow-hidden bg-surface/30">
              <summary className="flex items-center justify-between p-3 cursor-pointer list-none bg-brand-red/5 hover:bg-brand-red/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Dumbbell size={16} className="text-brand-red -rotate-45" />
                  <h2 className="font-bebas text-xl tracking-wider text-brand-red m-0 uppercase italic">
                    {children}
                  </h2>
                </div>
                <ChevronDown
                  size={18}
                  className="text-brand-red group-open:rotate-180 transition-transform duration-300"
                />
              </summary>
              <div className="p-4 border-t border-brand-red/10 bg-surface-darker/40 animate-in fade-in slide-in-from-top-2">
                {children}
              </div>
            </details>
          ),

          // H3: The Anchor Header
          h3: ({ children }) => (
            <div className="flex items-center gap-2 mb-3 mt-6 group">
              <div className="h-px flex-1 bg-surface-border" />
              <h3 className="font-bebas text-lg tracking-wide text-surface-text m-0 uppercase italic flex items-center gap-2">
                {children}
              </h3>
              <div className="h-px w-8 bg-surface-border" />
            </div>
          ),

          // TABLE: Fully Theme Responsive
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-surface-border bg-surface-darker/40">
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
            <td className="p-3 border-b border-surface-border/50 opacity-80 font-medium text-surface-text">
              {children}
            </td>
          ),

          // IMAGE: With Industrial Frame
          img: ({ src, alt }) => (
            <div className="my-6 overflow-hidden rounded-xl border-2 border-brand-red/20 bg-surface-darker shadow-2xl">
              <img
                src={src}
                alt={alt}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
              {alt && (
                <div className="bg-brand-red/10 p-3 text-[10px] uppercase font-black italic text-brand-red tracking-widest border-t border-brand-red/20 flex justify-between items-center">
                  <span>LOGISTICAL INTEL: {alt}</span>
                  <span className="px-2 py-0.5 border border-brand-red/30 rounded text-[8px] font-bebas">
                    SHAKTI PRO
                  </span>
                </div>
              )}
            </div>
          ),

          // Links and Code
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>
            const classes = `font-bold underline underline-offset-4 decoration-brand-red/40 transition-all hover:text-brand-red`
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

          code: ({ children, className }) => {
            const isInline = !className
            return isInline ? (
              <code className="px-2 py-0.5 rounded bg-brand-red/10 text-brand-red font-mono text-xs font-bold border border-brand-red/20">
                {children}
              </code>
            ) : (
              <code className="block p-4 bg-surface-darker/80 rounded-xl font-mono text-xs border border-surface-border overflow-x-auto text-surface-text">
                {children}
              </code>
            )
          },

          strong: ({ children }) => (
            <strong className="font-black text-brand-red tracking-tight">
              {children}
            </strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="pl-4 py-1 my-4 border-l-4 border-brand-red/40 bg-surface-darker/30 italic text-surface-muted text-sm">
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
