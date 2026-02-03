// MessageContent.tsx - Gym Style Markdown
import Link from "next/link"
import Markdown from "react-markdown"

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
    if (window.matchMedia("(max-width: 767px)").matches) {
      closeChat()
    }
  }

  return (
    <div className="font-montserrat">
      {" "}
      {/* Base font for the whole chat */}
      <Markdown
        components={{
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>
            const isInternalLink = href.startsWith("/")
            if (isInternalLink) {
              return (
                <Link
                  href={href}
                  onClick={handleCloseChat}
                  className={`font-bold underline underline-offset-2 transition-all ${
                    isUser
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                  }`}
                >
                  {children}
                </Link>
              )
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-bold underline underline-offset-2 transition-all ${
                  isUser
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                }`}
              >
                {children}
              </a>
            )
          },
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 leading-relaxed font-medium">
              {children}
            </p>
          ),
          h1: ({ children }) => (
            <h1 className="text-3xl font-bebas mb-4 text-zinc-900 dark:text-white tracking-wider uppercase">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bebas mb-3 text-zinc-900 dark:text-white tracking-wide uppercase">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bebas mb-2 text-zinc-900 dark:text-white uppercase">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-3 space-y-1.5 font-montserrat">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-3 space-y-1.5 font-montserrat">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-2 text-sm leading-relaxed font-medium">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="my-6 border-zinc-200/50 dark:border-zinc-700/50 bg-gradient-to-r from-transparent via-zinc-200 to-transparent h-px" />
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code
                  className={`px-2 py-1 rounded-lg font-mono text-xs font-semibold tracking-wide border ${
                    isUser
                      ? "bg-zinc-800/50 text-red-200 border-red-500/30"
                      : "bg-red-500/5 text-zinc-800 dark:text-zinc-200 border-zinc-200/50 dark:border-zinc-700/50"
                  }`}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                className={`${className} bg-red-500/5 border border-red-500/20 font-mono`}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="p-4 rounded-2xl bg-gradient-to-br from-red-500/5 to-zinc-900/5 border border-red-500/20 overflow-x-auto mb-4 text-xs font-mono shadow-sm">
              {children}
            </pre>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-zinc-900 dark:text-white tracking-tight">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-zinc-700 dark:text-zinc-300 font-medium">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="pl-6 pr-4 py-3 my-4 border-l-4 border-red-500/30 bg-red-500/5 rounded-r-2xl italic font-montserrat">
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
