import { notFound } from "next/navigation"
import { getProperty, getProperties } from "../_actions/property.action"
import { getCurrentUser } from "@/service/getCurrentUser"
import { PropertyDetailsContent } from "./_components/property-details-content"

// Define the type for route params in Next.js 15 (params is a Promise)
interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * PropertyDetailsPage (Server Component)
 * 
 * Why this file exists:
 * Top-level route component for dynamic route `/properties/[id]`.
 * 
 * Why Server Component:
 * Fetches single property data and checks user login status directly on the server.
 * 
 * Why async:
 * Required to await Next.js 15 params and server data requests.
 * 
 * Why props:
 * Passes property data and `isLoggedIn` state down to child UI components.
 */
export default async function PropertyDetailsPage({ params }: PageProps) {
  // 1. Await params to get the property ID from the URL (Next.js 15 requirement)
  const resolvedParams = await params
  const propertyId = resolvedParams.id

  // 2. Fetch single property, all properties, and current user in parallel on the server
  const [property, allProperties, currentUser] = await Promise.all([
    getProperty(propertyId),
    getProperties(),
    getCurrentUser(),
  ])

  // 3. If property does not exist in backend, render 404 page
  if (!property) {
    notFound()
  }

  // 4. Determine if the current visitor is authenticated
  const isLoggedIn = Boolean(currentUser && currentUser.success && currentUser.data)

  // 5. Render UI component passing property data and isLoggedIn via props
  return (
    <PropertyDetailsContent
      property={property}
      allProperties={allProperties}
      isLoggedIn={isLoggedIn}
    />
  )
}