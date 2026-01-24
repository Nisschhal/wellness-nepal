import type { Metadata } from "next"
import { Bebas_Neue, Montserrat } from "next/font/google" // Import the fonts
import "./globals.css"
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap", // Ensures text appears immediately
})

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      {/* Add dark class here if you want dark mode by default */}
      <body className={`${bebas.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
