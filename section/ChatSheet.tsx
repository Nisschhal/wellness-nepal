"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  Dumbbell,
  Send,
  X,
  AlertCircle,
  Square,
  RotateCcw,
  Sparkles,
  Truck,
  ShieldCheck,
  Flame,
  Info,
  Search,
  MapPin,
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

const QUICK_ACTIONS = [
  {
    label: "Product Specs",
    sub: "Technical gear data",
    icon: Search,
    text: "Show me 2 detailed specifications for your professional gym gear. (only specs)",
  },
  {
    label: "HQ Location",
    sub: "Visit Butwal office",
    icon: MapPin,
    text: "Where is the SHAKTI HQ located and what are your operating hours?",
  },
  {
    label: "Shipping Info",
    sub: "Logistics & Delivery",
    icon: Truck,
    text: "What are your delivery terms and shipping policies for Nepal?",
  },
  {
    label: "About Shakti",
    sub: "Company Mission",
    icon: Info,
    text: "Tell me more about SHAKTI's history and manufacturing mission.",
  },
]

export function ChatSheet() {
  const isOpen = useIsChatOpen()
  const { closeChat, clearPendingMessage } = useChatActions()
  const pendingMessage = usePendingMessage()

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [streamingBuffer, setStreamingBuffer] = useState("")
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // AI is active if fetching OR dripping text
  const isAIActive = isLoading || streamingBuffer.length > 0

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingBuffer])

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsLoading(false)
    setStreamingBuffer("")
    setActiveId(null)

    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeId && m.content === ""
          ? { ...m, content: "*Transmission Interrupted.*" }
          : m,
      ),
    )
  }, [activeId])

  // Typing animation drip
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
      }, 5)
      return () => clearTimeout(timeout)
    }
  }, [streamingBuffer, activeId])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isAIActive) return

      setError(null)
      abortControllerRef.current = new AbortController()

      const userMsgId = Date.now()
      const assistantId = Date.now() + 1

      setActiveId(assistantId)
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, threadId: "shakti-v1" }),
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) throw new Error("Logistical server unreachable.")

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
            if (parsed.type === "error") throw new Error(parsed.content)
          }
        }
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(e.message || "CONNECTION SEVERED: HQ malfunction.")
          setMessages((prev) =>
            prev.filter((m) => !(m.id === assistantId && m.content === "")),
          )
        }
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [isAIActive],
  )

  const handleRetry = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")
    if (lastUserMsg) {
      setMessages((prev) => {
        const filtered = [...prev]
        if (filtered[filtered.length - 1].role === "assistant") filtered.pop()
        return filtered
      })
      setError(null)
      sendMessage(lastUserMsg.content)
    }
  }

  useEffect(() => {
    if (isOpen && pendingMessage && !isAIActive) {
      sendMessage(pendingMessage)
      clearPendingMessage()
    }
  }, [isOpen, pendingMessage, isAIActive, sendMessage, clearPendingMessage])

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
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 z-[100] flex h-full w-full flex-col border-l border-surface-border bg-surface sm:w-[450px] shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* HEADER */}
            <header className="shrink-0 border-b-4 border-brand-red px-6 h-24 flex items-center justify-between bg-surface-darker shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-brand-red p-2.5 -skew-x-12">
                  <Dumbbell className="h-7 w-7 text-white skew-x-12" />
                </div>
                <div className="flex flex-col text-surface-text">
                  <span className="font-bebas text-3xl uppercase italic tracking-tighter">
                    SHAKTI <span className="text-brand-red">AI</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                    Industrial Gear Consultant
                  </span>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 text-surface-muted hover:text-brand-red transition-colors"
              >
                <X size={28} />
              </button>
            </header>

            {/* CHAT AREA / DASHBOARD */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-8 space-y-8 custom-scrollbar"
            >
              {messages.length === 0 ? (
                /* NEW DASHBOARD EMPTY STATE */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center min-h-full space-y-8 "
                >
                  <div className="text-center space-y-2">
                    <div className="flex justify-center mb-4">
                      <div className="p-4  bg-brand-red/10 -skew-x-12 border border-brand-red/20 animate-pulse">
                        <Sparkles className="text-brand-red h-8 w-8 " />
                      </div>
                    </div>
                    <h2 className="font-bebas text-5xl uppercase italic text-surface-text leading-tight">
                      Build Your{" "}
                      <span className="text-brand-red underline">Empire</span>
                    </h2>
                    <p className="font-montserrat text-[10px] font-black uppercase tracking-[0.3em] text-surface-muted opacity-60">
                      Select Specs to Begin Uplink
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 w-full max-w-sm px-4">
                    {QUICK_ACTIONS.map((action, idx) => (
                      <button
                        key={idx}
                        disabled={isAIActive}
                        onClick={() => sendMessage(action.text)}
                        className="group relative flex items-center gap-4 p-4 bg-surface-darker border border-surface-border hover:border-brand-red transition-all -skew-x-12 hover:bg-brand-red/5 text-left"
                      >
                        <div className="skew-x-12 bg-surface p-2 border border-surface-border group-hover:border-brand-red transition-colors">
                          <action.icon className="h-4 w-4 text-brand-red" />
                        </div>
                        <span className="skew-x-12 font-bebas text-lg uppercase italic text-surface-text tracking-wide group-hover:text-brand-red transition-colors">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="relative space-y-10 pb-10">
                  {messages.map((m) => (
                    <MessageBubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      closeChat={closeChat}
                      isThinking={
                        isLoading && m.id === activeId && m.content === ""
                      }
                    />
                  ))}

                  {/* ERROR UI */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-6 bg-brand-red/10 border-2 border-brand-red/30 rounded-2xl space-y-6 mx-2"
                      >
                        <div className="flex items-center gap-4 text-brand-red">
                          <div className="p-2 bg-brand-red text-white -skew-x-12">
                            <AlertCircle size={24} className="skew-x-12" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bebas text-2xl uppercase italic tracking-wider leading-none">
                              Consultant Busy
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mt-1">
                              Status: Connection Unstable
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-surface-text font-bold uppercase italic opacity-70 leading-relaxed">
                          The gear specialist is currently offline or handling
                          high-volume logistics. Uplink is not available at the
                          moment, hajur.
                        </p>

                        <div className="flex flex-col gap-3">
                          <button
                            onClick={handleRetry}
                            className="w-full py-4 bg-brand-red text-white font-bebas text-xl uppercase italic tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-surface-text transition-all shadow-lg -skew-x-12 group"
                          >
                            <RotateCcw
                              size={20}
                              className="skew-x-12 group-hover:rotate-180 transition-transform duration-500"
                            />
                            <span className="skew-x-12">Retry Connection</span>
                          </button>
                          <button
                            onClick={() => {
                              setError(null)
                              closeChat()
                            }}
                            className="w-full py-3 border-2 border-surface-border text-surface-muted font-bebas text-lg uppercase italic tracking-widest hover:bg-surface-darker transition-all -skew-x-12"
                          >
                            <span className="skew-x-12">Close Terminal</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* INPUT BAR */}
            <div className="p-6 border-t border-surface-border bg-surface-darker">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="relative flex items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isAIActive ? "SHAKTI IS ANALYZING..." : "ASK SPECIALIST..."
                  }
                  disabled={isAIActive || error !== null}
                  className="w-full h-16 pl-6 pr-20 bg-surface border-2 border-surface-border text-surface-text font-bebas text-xl uppercase italic focus:border-brand-red outline-none shadow-inner disabled:opacity-50 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isAIActive ? (
                    <button
                      type="button"
                      onClick={stopStreaming}
                      className="h-12 w-12 bg-brand-red text-white flex items-center justify-center -skew-x-12 shadow-lg hover:bg-surface-text transition-colors"
                    >
                      <Square className="h-5 w-5 fill-current skew-x-12" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim() || error !== null}
                      className="h-12 w-12 bg-brand-red text-white flex items-center justify-center -skew-x-12 shadow-lg transition-all disabled:bg-surface-muted/20 disabled:text-surface-muted"
                    >
                      <Send className="h-5 w-5 skew-x-12" />
                    </button>
                  )}
                </div>
              </form>
              <p className="text-[8px] text-center mt-4 text-surface-muted font-black uppercase tracking-[0.4em] opacity-30">
                Logistical Intel // Butwal HQ 🏔️
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
