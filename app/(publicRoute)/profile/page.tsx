import { getCurrentUser } from "@/service/getCurrentUser";
import { UserProfileView } from "@/components/profile/UserProfileView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserX } from "lucide-react";

export const metadata = {
  title: "My Profile | Thikana",
  description: "View and manage your Thikana user profile, contact details, and account settings.",
};

export default async function ProfilePage() {
  const response = await getCurrentUser();

  if (!response?.success || !response?.data) {
    return (
      <main className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center pt-32">
        <div className="h-20 w-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20 shadow-lg">
          <UserX className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2 tracking-tight">
          Not Logged In
        </h1>
        <p className="text-muted-foreground max-w-md mb-6 text-sm">
          Please log in to your Thikana account to view and manage your profile details.
        </p>
        <Link href="/auth/login">
          <Button variant="gradient" className="rounded-xl px-7 h-11 font-bold shadow-md shadow-blue-500/20">
            Login to Account
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-28 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <UserProfileView user={response.data} isOwnProfile={true} />
    </main>
  );
}
