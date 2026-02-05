"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Dumbbell,
  Send,
  Loader2,
  X,
  AlertCircle,
  Flame,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  useIsChatOpen,
  useChatActions,
  usePendingMessage,
} from "@/lib/store/chat-store-provider"
import { MessageBubble } from "@/components/ai/MessageBubble"

interface Message {
  id: string | number
  role: "user" | "assistant"
  content: string
}

export function ChatSheet() {
  const isOpen = useIsChatOpen()
  const { closeChat, clearPendingMessage } = useChatActions()
  const pendingMessage = usePendingMessage()

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [streamingBuffer, setStreamingBuffer] = useState("")
  const [activeId, setActiveId] = useState<string | number | null>(null)

  // --- 1. THE ONE-TIME SCROLL LOGIC ---
  // This triggers ONLY when the number of message bubbles changes.
  // It will NOT trigger while the AI is typing inside a bubble.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages.length]) // Triggered only when a new message is added to the list

  // --- 2. SMOOTH CHARACTER DRIP (Sliding Animation) ---
  useEffect(() => {
    if (streamingBuffer.length > 0 && activeId) {
      const timeout = setTimeout(() => {
        const char = streamingBuffer.charAt(0)
        setMessages((prev) =>
          prev.map((m) =>
            m.id === activeId ? { ...m, content: m.content + char } : m,
          ),
        )
        setStreamingBuffer((prev) => prev.substring(1))
        // NOTE: No scrolling happens here anymore!
      }, 0) // Slightly faster drip
      return () => clearTimeout(timeout)
    }
  }, [streamingBuffer, activeId])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return
      setError(false)
      const userMsgId = Date.now()
      const assistantId = Date.now() + 1

      setActiveId(assistantId)
      // Adding messages increases messages.length, which triggers the one-time scroll above
      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: "user", content: text },
        { id: assistantId, role: "assistant", content: "" },
      ])

      setInput("")
      setIsLoading(true)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ message: text, threadId: "shakti-v1" }),
        })
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        while (reader) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split("\n\n")
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue
            const data = line.replace("data: ", "")
            if (data === "[DONE]") break
            const parsed = JSON.parse(data)
            if (parsed.type === "token")
              setStreamingBuffer((prev) => prev + parsed.content)
          }
        }
      } catch (e) {
        setError(true)
        setIsLoading(false)
      }
    },
    [isLoading],
  )

  useEffect(() => {
    if (streamingBuffer.length === 0 && isLoading) setIsLoading(false)
  }, [streamingBuffer, isLoading])

  useEffect(() => {
    if (isOpen && pendingMessage && !isLoading) {
      sendMessage(pendingMessage)
      clearPendingMessage()
    }
  }, [isOpen, pendingMessage, isLoading, sendMessage, clearPendingMessage])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-surface/80 backdrop-blur-md lg:hidden"
            onClick={closeChat}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[100] flex h-full w-full flex-col border-l border-surface-border bg-surface sm:w-[450px]"
          >
            <header className="shrink-0 border-b-4 border-brand-red px-6 h-24 flex items-center justify-between bg-surface-darker">
              <div className="flex items-center gap-4">
                <div className="bg-brand-red p-2.5 -skew-x-12 shadow-lg shadow-brand-red/20">
                  <Dumbbell className="h-7 w-7 text-white skew-x-12" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bebas text-3xl uppercase italic tracking-tighter text-surface-text leading-none">
                    SHAKTI <span className="text-brand-red">AI</span>
                  </span>
                  <span className="text-[10px] font-black text-surface-muted uppercase tracking-[0.2em] mt-1">
                    Industrial Fitness Consultant
                  </span>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 text-surface-muted hover:text-brand-red hover:rotate-90 transition-all duration-300"
              >
                <X size={28} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto relative px-4 py-8 space-y-8 custom-scrollbar"
            >
              <div className="absolute inset-0 bg-pattern opacity-[0.03] pointer-events-none" />

              {messages.length === 0 ? (
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[70%] text-center space-y-8 px-4">
                  <div className="space-y-3">
                    <h2 className="font-bebas text-4xl uppercase italic text-surface-text leading-tight">
                      Build Your <span className="text-brand-red">Empire</span>
                    </h2>
                    <p className="text-surface-muted text-sm max-w-[280px] font-medium italic">
                      Nepal&apos;s iron database is at your command.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
                    {[
                      "Show industrial treadmills",
                      "Equip home gym under 5L",
                    ].map((s) => (
                      <button
                        key={s}
                        className="p-4 bg-surface-darker border border-surface-border hover:border-brand-red text-left -skew-x-12 transition-all shadow-sm"
                        onClick={() => sendMessage(s)}
                      >
                        <span className="skew-x-[12deg] block font-black text-[11px] uppercase tracking-widest text-surface-text">
                          {s}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative z-10 space-y-10 pb-6">
                  {messages.map((m) => (
                    <MessageBubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      closeChat={closeChat}
                    />
                  ))}
                  {isLoading &&
                    messages[messages.length - 1].content === "" && (
                      <div className="flex gap-4 animate-pulse">
                        <div className="bg-brand-red/20 p-2 -skew-x-12">
                          <Dumbbell className="h-5 w-5 text-brand-red skew-x-12" />
                        </div>
                        <span className="font-bebas text-xl text-brand-red italic uppercase self-center">
                          Consultant Analyzing...
                        </span>
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-surface-border bg-surface-darker">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="relative flex items-center"
              >
                <div className="relative flex-1">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="ASK GEAR SPECIALIST..."
                    disabled={isLoading}
                    className="w-full h-16 pl-6 pr-20 bg-surface border-2 border-surface-border text-surface-text font-bebas text-xl tracking-widest uppercase italic focus:border-brand-red outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="h-12 w-12 bg-brand-red hover:bg-surface-text text-white flex items-center justify-center -skew-x-12 shadow-xl group disabled:bg-surface-border"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5 skew-x-12 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
