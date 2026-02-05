import { User, Dumbbell } from "lucide-react"
import { MessageContent } from "./MessageContent"

interface MessageBubbleProps {
  role: string
  content: string
  closeChat: () => void
  isThinking: boolean
}

export function MessageBubble({
  role,
  content,
  closeChat,
  isThinking,
}: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div
      className={`flex gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-lg -skew-x-6 border transition-colors ${
          isUser
            ? "bg-surface-darker border-brand-red/30"
            : "bg-brand-red border-white/20"
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-surface-text skew-x-6" />
        ) : (
          <Dumbbell
            className={`h-5 w-5 text-white skew-x-6 ${isThinking ? "animate-spin" : ""}`}
          />
        )}
      </div>

      <div
        className={`flex flex-col gap-1.5 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-surface-muted italic">
          {isUser ? "YOU" : "SHAKTI AI // GEAR CONSULTANT"}
        </span>

        <div
          className={`rounded-xl px-4 py-3 text-sm shadow-xl backdrop-blur-md border transition-all duration-300 ${
            isUser
              ? "bg-surface-darker/90 border-brand-red/20 text-surface-text"
              : "bg-surface-darker/60 border-surface-border text-surface-text min-w-[120px]"
          }`}
        >
          {isThinking ? (
            <div className="flex flex-col gap-2 py-1">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-bounce" />
                </div>
                <span className="font-bebas text-xs tracking-[0.2em] text-brand-red uppercase italic animate-pulse">
                  Analyzing Iron...
                </span>
              </div>
            </div>
          ) : (
            <MessageContent
              content={content}
              closeChat={closeChat}
              isUser={isUser}
            />
          )}
        </div>
      </div>
    </div>
  )
}
