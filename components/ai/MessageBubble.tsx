import { User, Dumbbell } from "lucide-react"
import { MessageContent } from "./MessageContent"

interface MessageBubbleProps {
  role: string
  content: string
  closeChat: () => void
}

export function MessageBubble({
  role,
  content,
  closeChat,
}: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar - SHAKTI Industrial Theme */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-lg -skew-x-6 ${
          isUser
            ? "bg-zinc-900 border border-brand-red/30"
            : "bg-brand-red border border-white/20"
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white skew-x-6" />
        ) : (
          <Dumbbell className="h-5 w-5 text-white skew-x-6" />
        )}
      </div>

      {/* Message Content Bubble */}
      <div
        className={`max-w-[85%] rounded-xl px-4 py-3 text-sm shadow-xl backdrop-blur-md border ${
          isUser
            ? "bg-surface-darker/90 border-brand-red/20 text-surface-text"
            : "bg-surface-darker/50 border-white/5 text-surface-text"
        }`}
      >
        {/* We pass the raw string content directly now */}
        <MessageContent
          content={content}
          closeChat={closeChat}
          isUser={isUser}
        />
      </div>
    </div>
  )
}
