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
  ShieldCheck,
  Truck,
  Warehouse,
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

  // 1. One-time scroll when new bubbles are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages.length])

  // 2. Smooth "Dripping" Animation
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
      }, 5) // Ultra-fast drip for industrial feel
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
            <header className="shrink-0 border-b-4 border-brand-red px-6 h-24 flex items-center justify-between bg-surface-darker shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-brand-red p-2.5 -skew-x-12">
                  <Dumbbell className="h-7 w-7 text-white skew-x-12" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bebas text-3xl uppercase italic tracking-tighter text-surface-text">
                    SHAKTI <span className="text-brand-red">AI</span>
                  </span>
                  <span className="text-[10px] font-black text-surface-muted uppercase tracking-[0.2em]">
                    Senior Gear Consultant
                  </span>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 hover:text-brand-red hover:rotate-90 transition-all duration-300"
              >
                <X size={28} />
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto relative px-4 py-8 space-y-8 custom-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-full space-y-10 px-4">
                  <div className="text-center space-y-2">
                    <h2 className="font-bebas text-5xl uppercase italic text-surface-text leading-none">
                      BUILD YOUR{" "}
                      <span className="text-brand-red underline decoration-wavy underline-offset-8">
                        EMPIRE
                      </span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-surface-muted">
                      Shakti Industrial Database // v1.0.4
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                    {[
                      {
                        icon: <Flame className="text-brand-red" />,
                        text: "Setup Full Commercial Gym",
                        query:
                          "Hajur, show me a complete commercial gym setup guide.",
                      },
                      {
                        icon: <Dumbbell className="text-brand-red" />,
                        text: "Explore Strength Equipment",
                        query:
                          "Show me heavy-duty strength and multi-station machines hajur.",
                      },
                      {
                        icon: <Truck className="text-brand-red" />,
                        text: "Check Delivery & VAT Policy",
                        query:
                          "What is your delivery policy and VAT terms hajur?",
                      },
                      {
                        icon: <ShieldCheck className="text-brand-red" />,
                        text: "Warranty & Maintenance",
                        query:
                          "Tell me about the Shakti structural warranty hajur.",
                      },
                    ].map((item) => (
                      <button
                        key={item.text}
                        className="group flex items-center gap-4 p-4 bg-surface-darker border border-surface-border hover:border-brand-red transition-all -skew-x-12 shadow-lg"
                        onClick={() => sendMessage(item.query)}
                      >
                        <div className="skew-x-12 bg-surface p-2 border border-surface-border group-hover:border-brand-red transition-colors">
                          {item.icon}
                        </div>
                        <span className="skew-x-12 font-bebas text-lg uppercase italic tracking-wider text-surface-text">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-brand-red/5 border-l-2 border-brand-red text-[10px] font-medium italic text-surface-muted">
                    Namaste! I am the SHAKTI AI Consultant. Please select a
                    logistical directive or ask me about industrial iron
                    specifications hajur.
                  </div>
                </div>
              ) : (
                <div className="space-y-10 pb-6">
                  {messages.map((m) => (
                    <MessageBubble
                      key={m.id}
                      role={m.role}
                      content={m.content}
                      closeChat={closeChat}
                    />
                  ))}

                  {/* INDUSTRIAL LOADING STATE */}
                  {isLoading &&
                    messages[messages.length - 1].content === "" && (
                      <div className="flex flex-col gap-3 animate-in fade-in duration-500">
                        <div className="flex gap-4 items-center">
                          <div className="h-10 w-10 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center -skew-x-12 animate-spin-slow">
                            <Dumbbell className="h-5 w-5 text-brand-red skew-x-12" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bebas text-xl text-brand-red italic tracking-widest uppercase">
                              Analyzing Iron Specs...
                            </span>
                            <span className="text-[8px] font-black uppercase text-surface-muted tracking-[0.3em] animate-pulse">
                              Establishing Industrial Uplink // Traffic Chowk
                              Butwal
                            </span>
                          </div>
                        </div>
                        <div className="h-1 w-32 bg-surface-border overflow-hidden rounded-full">
                          <div className="h-full bg-brand-red animate-loading-bar" />
                        </div>
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
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="ASK INDUSTRIAL SPECIALIST..."
                  disabled={isLoading}
                  className="w-full h-16 pl-6 pr-20 bg-surface border-2 border-surface-border text-surface-text font-bebas text-xl tracking-widest uppercase italic focus:border-brand-red outline-none shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 h-12 w-12 bg-brand-red hover:bg-white hover:text-brand-red text-white flex items-center justify-center -skew-x-12 transition-all shadow-xl shadow-brand-red/20"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send size={20} className="skew-x-12" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
