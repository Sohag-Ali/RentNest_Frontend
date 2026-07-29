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
    <div>
        <Navbar user={user} />
        {children}
        <Toaster richColors position="top-right" />
    </div>
  )
}