import { getCurrentUser } from "@/service/getCurrentUser";
import { UserProfileView } from "@/components/profile/UserProfileView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserX } from "lucide-react";

export const metadata = {
  title: "My Profile | RentNest",
  description: "View and manage your RentNest user profile, contact details, and account settings.",
};

export default async function ProfilePage() {
  const response = await getCurrentUser();

  if (!response?.success || !response?.data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
          <UserX className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Not Logged In</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          Please log in to view and manage your profile details.
        </p>
        <Link href="/auth/login">
          <Button className="rounded-xl px-6">Login to Account</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <UserProfileView user={response.data} isOwnProfile={true} />
    </div>
  );
}
