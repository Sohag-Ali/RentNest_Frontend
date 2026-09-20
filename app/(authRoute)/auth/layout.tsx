import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { ThikanaLogo } from "@/components/shared/ThikanaLogo"
import Link from "next/link"
import { Toaster } from "sonner"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 relative overflow-x-hidden selection:bg-[#0EA5E9]/20 selection:text-[#0EA5E9] transition-colors duration-300">
      {/* Background Decorative Ambient Glows for Desktop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-sky-200/40 via-blue-100/20 to-transparent dark:from-sky-950/25 dark:via-blue-950/10 dark:to-transparent rounded-full blur-[140px]" />
      </div>

      {/* Top Bar: Floating Theme Toggle (Top Right) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Auth Header with Centered Clickable Logo */}
      <header className="pt-8 sm:pt-12 pb-2 sm:pb-4 px-4 flex flex-col items-center justify-center relative z-10 shrink-0">
        <Link 
          href="/" 
          className="inline-block transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          title="Return to Thikana Homepage"
        >
          <ThikanaLogo size="lg" />
        </Link>
      </header>

      {/* Main Authentication Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-4 sm:py-6 relative z-10 w-full">
        {children}
      </main>

      {/* Simple Clean Auth Footer */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 dark:text-slate-600 relative z-10 shrink-0 select-none">
        © {new Date().getFullYear()} Thikana. All rights reserved.
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  )
}