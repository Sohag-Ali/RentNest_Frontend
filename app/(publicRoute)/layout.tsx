import { Footer } from "@/components/shared/Footer"
import { Navbar } from "@/components/shared/Navbar"
import { getCurrentUser } from "@/service/getCurrentUser"


export default async function PublicLayout({
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
        <Footer />
    </div>
  )
}