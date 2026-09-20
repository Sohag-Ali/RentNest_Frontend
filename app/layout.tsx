import { Inter, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { NotificationProvider } from "@/providers/notification-provider"
import { cn } from "@/lib/utils";
import { Toaster } from "sonner"

import type { Metadata } from "next";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Thikana | Find Your Dream Home & Rental Properties",
  description: "Discover, inspect, and book verified house rentals with Thikana. Connecting tenants and landlords with digital transparency.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body className="bg-background text-foreground transition-colors duration-300 min-h-screen selection:bg-sky-500/20 selection:text-sky-600">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="thikana-theme">
          <QueryProvider>
            <NotificationProvider>
              {children}
              <Toaster richColors position="top-right" />
            </NotificationProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


