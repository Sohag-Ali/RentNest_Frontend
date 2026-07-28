import { Navbar } from "@/components/shared/Navbar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
  
}