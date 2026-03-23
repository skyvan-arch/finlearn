import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "FinLearn — Financial Markets",
  description: "Master financial markets with lessons and flashcards from Hull and Rebonato.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "FinLearn" },
}

export const viewport: Viewport = {
  themeColor: "#1a4a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  )
}
