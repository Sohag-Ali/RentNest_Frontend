import { getProperties } from "./_actions/property.action"
import { PropertyListing } from "./_components/property-listing"

export default async function PropertyPage() {
  const properties = await getProperties()

  return <PropertyListing properties={properties} />
}