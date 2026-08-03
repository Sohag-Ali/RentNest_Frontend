import { Navbar } from "@/components/shared/Navbar"
import { getCurrentUser } from "@/service/getCurrentUser"
import { Toaster } from "sonner"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userRes = await getCurrentUser()
  const user = userRes?.data || null

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar user={user} />
      <div className="flex-1">{children}</div>
      <Toaster richColors position="top-right" />
    </div>
  )
}