import { notFound } from "next/navigation"
import { getProperty, getProperties } from "../_actions/property.action"
import { PropertyDetailsContent } from "./_components/property-details-content"

// Define the type for route params in Next.js 15 (params is a Promise)
interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * PropertyDetailsPage (Server Component)
 * 
 * Why this file exists:
 * Handles dynamic route `/properties/[id]` to render single property details page.
 * 
 * Why Server Component:
 * Renders on server side for fast loading, security, and SEO.
 * 
 * Why async:
 * Next.js 15 requires awaiting `params` and server action promises.
 * 
 * Why fetch happens here:
 * Top-level route component fetches data based on URL parameter `id`
 * and passes it down to child components via props.
 */
export default async function PropertyDetailsPage({ params }: PageProps) {
  // 1. Await params to get the property ID from the URL (Next.js 15 standard)
  const resolvedParams = await params
  const propertyId = resolvedParams.id

  // 2. Fetch single property data and all properties (for similar properties section) in parallel
  const [property, allProperties] = await Promise.all([
    getProperty(propertyId),
    getProperties(),
  ])

  // 3. If property does not exist in backend, trigger 404 page
  if (!property) {
    notFound()
  }

  // 4. Pass backend data down to UI component through props
  return (
    <PropertyDetailsContent
      property={property}
      allProperties={allProperties}
    />
  )
}