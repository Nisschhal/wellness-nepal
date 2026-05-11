"use client"

import dynamic from "next/dynamic"

const ChatSheet = dynamic(
  () => import("@/section/ChatSheet").then((mod) => mod.ChatSheet),
  { ssr: false },
)

export default function ChatSheetLazy() {
  return <ChatSheet />
}
