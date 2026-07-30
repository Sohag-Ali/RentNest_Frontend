import { notFound } from "next/navigation"
import { getProperty, getProperties } from "../_actions/property.action"
import { PropertyDetailsContent } from "./_components/property-details-content"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params

  const [property, allProperties] = await Promise.all([
    getProperty(id),
    getProperties(),
  ])

  if (!property) {
    notFound()
  }

  return <PropertyDetailsContent property={property} allProperties={allProperties} />
}