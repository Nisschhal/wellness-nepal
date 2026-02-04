"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import {
  Dumbbell,
  Send,
  Loader2,
  X,
  AlertCircle,
  Flame,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion" // Added motion and AnimatePresence
import {
  useIsChatOpen,
  useChatActions,
  usePendingMessage,
} from "@/lib/store/chat-store-provider"

// Custom Components
import { getMessageText, getToolParts } from "@/components/ai/utils"
import { MessageBubble } from "@/components/ai/MessageBubble"

export function ChatSheet() {
  const isOpen = useIsChatOpen()
  const { closeChat, clearPendingMessage } = useChatActions()
  const pendingMessage = usePendingMessage()

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error, regenerate } = useChat()
  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading, isOpen])

  useEffect(() => {
    if (isOpen && pendingMessage && !isLoading) {
      sendMessage({ text: pendingMessage })
      clearPendingMessage()
    }
  }, [isOpen, pendingMessage, isLoading, sendMessage, clearPendingMessage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop - Changed to motion.div for exit animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-surface/80 backdrop-blur-md lg:hidden"
            onClick={closeChat}
            aria-hidden="true"
          />

          {/* Sidebar Container - Changed to motion.div for exit animation */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[100] flex h-full w-full flex-col border-l border-surface-border bg-surface shadow-[-20px_0_50px_rgba(0,0,0,0.2)] dark:bg-surface sm:w-[450px]"
          >
            {/* Header - Exact same layout */}
            <header className="shrink-0 border-b-4 border-brand-red px-6 h-24 flex items-center justify-between bg-surface-darker transition-colors">
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

            {/* Chat Body - Exact same layout */}
            <div className="flex-1 overflow-y-auto relative overscroll-contain px-4 py-8 space-y-8 custom-scrollbar">
              <div className="absolute inset-0 bg-pattern opacity-[0.03] pointer-events-none" />

              {messages.length === 0 ? (
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[70%] text-center space-y-8 px-4">
                  <div className="space-y-3">
                    <h2 className="font-bebas text-4xl uppercase italic text-surface-text leading-tight">
                      Build Your <span className="text-brand-red">Empire</span>
                    </h2>
                    <p className="text-surface-muted text-sm max-w-[280px] font-medium italic">
                      Nepal&apos;s iron database is at your command. Select an
                      objective to begin:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
                    {[
                      "Show industrial treadmills",
                      "Strength machines for chest",
                      "Full commercial gym setup",
                      "Equip home gym under 5L",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="group flex items-center justify-between p-4 bg-surface-darker border border-surface-border hover:border-brand-red text-left transition-all skew-x-[-12deg] shadow-sm hover:shadow-brand-red/10"
                        onClick={() => sendMessage({ text: suggestion })}
                      >
                        <div className="skew-x-[12deg] flex items-center gap-3">
                          <Flame className="w-4 h-4 text-brand-red opacity-50 group-hover:opacity-100 transition-opacity" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-surface-text">
                            {suggestion}
                          </span>
                        </div>
                        <Sparkles className="w-3 h-3 text-brand-red opacity-0 group-hover:opacity-100 skew-x-[12deg] transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative z-10 space-y-10 pb-6">
                  {messages.map((message) => {
                    const content = getMessageText(message)
                    if (!content) return null

                    return (
                      <div key={message.id} className="space-y-6">
                        <MessageBubble
                          role={message.role}
                          content={content}
                          closeChat={closeChat}
                        />
                      </div>
                    )
                  })}

                  {error && (
                    <div className="p-6 bg-brand-red/5 border-l-4 border-brand-red space-y-4">
                      <div className="flex items-center gap-3 text-brand-red">
                        <AlertCircle className="w-6 h-6" />
                        <span className="font-bebas text-2xl uppercase tracking-wider italic">
                          CONNECTION SEVERED
                        </span>
                      </div>
                      <p className="text-xs text-surface-muted font-bold uppercase italic">
                        The consultant is offline. Re-establish connection
                        below.
                      </p>
                      <button
                        className="w-full py-3 bg-brand-red text-white font-bebas text-xl uppercase italic tracking-widest hover:bg-surface-text transition-colors shadow-lg shadow-brand-red/20"
                        onClick={() => regenerate()}
                      >
                        Restart Uplink
                      </button>
                    </div>
                  )}

                  {isLoading &&
                    messages[messages.length - 1]?.role === "user" && (
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-brand-red/10 border border-brand-red/20 flex items-center justify-center animate-pulse -skew-x-12">
                          <Dumbbell className="h-5 w-5 text-brand-red skew-x-12" />
                        </div>
                        <div className="flex gap-2">
                          <span className="h-2 w-2 bg-brand-red/40 animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 bg-brand-red/40 animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 bg-brand-red/40 animate-bounce" />
                        </div>
                      </div>
                    )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Bar - Exact same layout */}
            <div className="p-6 border-t border-surface-border bg-surface-darker">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center"
              >
                <div className="relative flex-1">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Gear Specialist..."
                    disabled={isLoading}
                    className="w-full h-16 pl-6 pr-20 bg-surface border-2 border-surface-border text-surface-text font-bebas text-xl tracking-widest uppercase italic focus:border-brand-red outline-none transition-all placeholder:opacity-30 shadow-inner"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="h-12 w-12 bg-brand-red hover:bg-surface-text text-white flex items-center justify-center transition-all shadow-xl -skew-x-12 disabled:bg-surface-border group"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5 skew-x-12 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <p className="text-[10px] text-center mt-4 text-surface-muted font-black uppercase tracking-[0.4em] italic opacity-50">
                Logistical Intel // Shakti Nepal 🏔️
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
