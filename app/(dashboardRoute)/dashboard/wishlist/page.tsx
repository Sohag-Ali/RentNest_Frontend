import { redirect } from "next/navigation";

export default function WishlistRedirectPage() {
  redirect("/dashboard/tenant/wishlist");
}
