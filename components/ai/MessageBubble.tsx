// MessageBubble.tsx - Gym Style
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
      {/* Avatar - Gym Theme */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-gray-900 to-zinc-800 border-2 border-red-500/30"
            : "bg-gradient-to-br from-red-500/10 to-red-400/10 border-2 border-red-500/20"
        }`}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Dumbbell className="h-5 w-5 text-red-500" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm shadow-lg backdrop-blur-sm border ${
          isUser
            ? "bg-gradient-to-r from-red-500/10 to-red-400/10 border-red-500/30"
            : "bg-gradient-to-r from-gray-50/80 to-zinc-100/70 dark:from-zinc-900/50 dark:to-zinc-800/70 border-zinc-200/50 dark:border-zinc-700/50"
        }`}
      >
        <MessageContent
          content={content}
          closeChat={closeChat}
          isUser={isUser}
        />
      </div>
    </div>
  )
}
