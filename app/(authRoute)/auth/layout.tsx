import { Navbar } from "@/components/shared/Navbar"
import { Toaster } from "sonner"


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
    </div>
  )
  
}