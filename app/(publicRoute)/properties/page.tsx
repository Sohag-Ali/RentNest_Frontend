import { getProperties } from "./_actions/property.action"
import { PropertyListing } from "./_components/property-listing"

/**
 * PropertyPage Component (Server Component)
 * 
 * Why Server Component:
 * In Next.js 15, page components are Server Components by default.
 * Fetching data here happens on the server before sending HTML to the client browser.
 * This provides better performance, faster initial load, and strong SEO.
 * 
 * Why async:
 * `async` is required so we can use `await` to wait for data from `getProperties()` server action.
 */
export default async function PropertyPage() {
  // 1. Fetch all property listings from the backend API using our Server Action
  const properties = await getProperties()

  // 2. Render the PropertyListing component and pass the backend properties down as a prop
  return <PropertyListing properties={properties} />
}