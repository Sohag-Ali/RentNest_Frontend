"use server"

import { Property } from "@/types/property"

const BASE_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"

const API_BASE_URL = `${BASE_URL.replace(/\/$/, "")}/api/properties`

function extractCategoryName(category: any): string {
  if (!category) return "Apartment"
  if (typeof category === "string") return category
  if (typeof category === "object" && category.name) {
    const name = String(category.name)
    if (name.includes("UUID") || name.includes("PUT_YOUR_CATEGORY")) {
      return "Apartment"
    }
    return name
  }
  return "Apartment"
}

function normalizeProperty(raw: any): Property {
  if (!raw || typeof raw !== "object") {
    return {
      id: "unknown",
      title: "Property",
      slug: "property",
      description: "",
      location: "",
      city: "",
      state: "",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 0,
      rating: 0,
      reviewCount: 0,
      isFeatured: false,
      isAvailable: true,
      category: "Apartment",
      mainImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      images: [],
      amenities: [],
      createdAt: new Date().toISOString(),
    }
  }

  const categoryName = extractCategoryName(raw.category)
  const overviewCategory = raw.overview?.category
    ? extractCategoryName(raw.overview.category)
    : categoryName

  const mainImage =
    raw.mainImage ||
    (Array.isArray(raw.images) && raw.images[0]) ||
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"

  const images =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : [mainImage]

  const landlord = raw.landlord
    ? {
        id: raw.landlord.id || "",
        name: raw.landlord.name || "Landlord",
        avatar:
          raw.landlord.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        phone: raw.landlord.phone || undefined,
        email: raw.landlord.email || undefined,
        isSuperhost: Boolean(raw.landlord.isSuperhost),
        isVerified: Boolean(raw.landlord.isVerified),
        rating: Number(raw.landlord.rating ?? 0),
        responseRate: raw.landlord.responseRate ? String(raw.landlord.responseRate) : undefined,
        responseTime: raw.landlord.responseTime ? String(raw.landlord.responseTime) : undefined,
      }
    : undefined

  const overview = raw.overview
    ? {
        address: raw.overview.address || raw.location || "",
        city: raw.overview.city || raw.city || "",
        state: raw.overview.state || raw.state || "",
        zipCode: raw.overview.zipCode || "",
        category: overviewCategory,
        availableFrom: raw.overview.availableFrom || (raw.isAvailable ? "Immediate" : "Pending"),
        status: raw.overview.status || (raw.isAvailable ? "Available" : "Pending"),
        yearBuilt: raw.overview.yearBuilt != null ? Number(raw.overview.yearBuilt) : undefined,
        depositAmount:
          raw.overview.depositAmount != null ? Number(raw.overview.depositAmount) : Number(raw.price || 0),
        leaseTerm: raw.overview.leaseTerm || "12 Months",
        petPolicy: raw.overview.petPolicy || "Contact Landlord",
        parkingType: raw.overview.parkingType || "Available",
      }
    : undefined

  return {
    id: String(raw.id || Math.random()),
    title: raw.title || "Untitled Property",
    slug: raw.slug || (raw.title ? String(raw.title).toLowerCase().replace(/[^a-z0-9]+/g, "-") : String(raw.id || "property")),
    description: raw.description || "",
    detailedDescription: raw.detailedDescription || raw.description || "",
    location: raw.location || `${raw.city || ""}, ${raw.state || ""}`,
    city: raw.city || "",
    state: raw.state || "",
    price: Number(raw.price ?? 0),
    bedrooms: Number(raw.bedrooms ?? 0),
    bathrooms: Number(raw.bathrooms ?? 0),
    areaSqFt: Number(raw.areaSqFt ?? 0),
    rating: Number(raw.rating ?? 0),
    reviewCount: Number(raw.reviewCount ?? 0),
    isFeatured: Boolean(raw.isFeatured),
    isAvailable: raw.isAvailable !== undefined ? Boolean(raw.isAvailable) : true,
    category: categoryName,
    mainImage,
    images,
    amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
    createdAt: raw.createdAt || new Date().toISOString(),
    landlord,
    overview,
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(API_BASE_URL, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`Failed to fetch properties. Status: ${res.status} ${res.statusText}`)
      return []
    }

    const result = await res.json()

    let rawList: any[] = []
    if (Array.isArray(result)) rawList = result
    else if (result && Array.isArray(result.data)) rawList = result.data
    else if (result?.data && Array.isArray(result.data.properties)) rawList = result.data.properties
    else if (result && Array.isArray(result.properties)) rawList = result.properties

    return rawList.map(normalizeProperty)
  } catch (error) {
    console.error("Error in getProperties server action:", error)
    return []
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      const all = await getProperties()
      const found = all.find((p) => p.id === id || p.slug === id)
      return found || null
    }

    const result = await res.json()

    let rawData: any = null
    if (result && result.data && typeof result.data === "object" && !Array.isArray(result.data)) {
      rawData = result.data
    } else if (result && result.property && typeof result.property === "object") {
      rawData = result.property
    } else if (result && typeof result === "object" && !Array.isArray(result) && result.id) {
      rawData = result
    }

    if (rawData) {
      return normalizeProperty(rawData)
    }

    const all = await getProperties()
    const found = all.find((p) => p.id === id || p.slug === id)
    return found || null
  } catch (error) {
    console.error(`Error in getProperty server action for ID ${id}:`, error)
    try {
      const all = await getProperties()
      const found = all.find((p) => p.id === id || p.slug === id)
      return found || null
    } catch {
      return null
    }
  }
}


