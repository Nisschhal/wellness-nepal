"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Dumbbell, Send, Loader2, X, AlertCircle, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  useIsChatOpen,
  useChatActions,
  usePendingMessage,
} from "@/lib/store/chat-store-provider"

// Custom Components
import { getMessageText, getToolParts } from "@/components/ai/utils"
import { MessageBubble } from "@/components/ai/MessageBubble"
import { ToolCallUI } from "@/components/ai/ToolCallUI"

export function ChatSheet() {
  const isOpen = useIsChatOpen()
  const { closeChat, clearPendingMessage } = useChatActions()
  const pendingMessage = usePendingMessage()

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // useChat hooks directly into your /api/chat route
  const { messages, sendMessage, status, error, regenerate } = useChat()
  console.log({ messages, status })
  const isLoading = status === "streaming" || status === "submitted"

  // 1. Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading, isOpen])

  // 2. Handle messages sent from the Product Page "Ask Expert" button
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

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <div className="fixed top-0 right-0 z-[100] flex h-full w-full flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:w-[450px] animate-in slide-in-from-right duration-300 ease-out">
        {/* Header - Industrial Gym Theme */}
        <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800 px-6 h-20 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg rotate-3 shadow-lg shadow-red-500/20">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
                Shakti AI
              </span>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                Performance Specialist
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeChat}
            className="rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center min-h-[60%] text-center space-y-6 px-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase italic italic text-zinc-900 dark:text-white">
                  Build Your Empire 🏔️
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[280px] font-medium">
                  Ask me about commercial gear, price quotes, or setting up a
                  CrossFit box.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                {[
                  "Show me best treadmills",
                  "Strength machines for chest",
                  "CrossFit Rig options",
                  "Equip a home gym under 5L",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="justify-start text-left h-auto py-3 px-4 text-xs font-bold uppercase tracking-tight border-zinc-200 dark:border-zinc-800 hover:border-red-500 hover:text-red-500 transition-all"
                    onClick={() => sendMessage({ text: suggestion })}
                  >
                    <Flame className="w-3 h-3 mr-2 text-red-500" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Thread */
            <div className="space-y-8 pb-4">
              {messages.map((message) => {
                const content = getMessageText(message)
                const toolParts = getToolParts(message)
                console.log("toolpart", toolParts)
                const hasContent = content.length > 0
                const hasTools = toolParts.length > 0

                if (!hasContent && !hasTools) return null

                return (
                  <div key={message.id} className="space-y-4">
                    {/* 1. Render Tool Call UI (Product Widgets) */}
                    {/* {hasTools &&
                      toolParts.map((toolPart) => (
                        <ToolCallUI
                          key={toolPart.toolCallId}
                          toolPart={toolPart}
                          closeChat={closeChat}
                        />
                      ))} */}

                    {/* 2. Render Text Content (The Coach's Hype) */}
                    {content && (
                      <MessageBubble
                        role={message.role}
                        content={content}
                        closeChat={closeChat}
                      />
                    )}
                  </div>
                )
              })}

              {/* Error State */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-bold uppercase text-xs tracking-tighter">
                      System Failure
                    </span>
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-300 font-medium">
                    Coach is out of breath! Give it a second or hit regenerate.
                  </p>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full text-[10px] font-black uppercase tracking-widest h-9"
                    onClick={() => regenerate()}
                  >
                    Restart Session
                  </Button>
                </div>
              )}

              {/* Typing/Loading Indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
                    <Dumbbell className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex gap-1.5 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl rounded-tl-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for gear or quotes..."
                disabled={isLoading}
                className="h-14 pl-4 pr-12 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-red-500 font-medium text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/20 transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </form>
          <p className="text-[9px] text-center mt-3 text-zinc-400 font-bold uppercase tracking-widest">
            Powered by Shakti Fitness Nepal 🏔️
          </p>
        </div>
      </div>
    </>
  )
}
