import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/app-shell"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "RateReveal - Factoring Agreement Analysis",
  description:
    "Upload your factoring agreement. We'll itemize hidden fees and estimate the true rate you're paying vs advertised rates.",
}

export const viewport: Viewport = {
  themeColor: "#05070C",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
