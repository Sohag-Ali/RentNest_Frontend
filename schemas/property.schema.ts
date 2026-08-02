import { z } from "zod";

export const propertyOverviewSchema = z.object({
  address: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(3, "Zip Code must be at least 3 characters"),
  availableFrom: z.string().min(1, "Available date/period is required"),
  status: z.string().min(1, "Status is required"),
  yearBuilt: z.coerce
    .number()
    .min(1800, "Year built must be after 1800")
    .max(new Date().getFullYear() + 5, "Year built cannot be in the far future"),
  depositAmount: z.coerce
    .number()
    .min(0, "Deposit amount cannot be negative"),
  leaseTerm: z.string().min(1, "Lease term is required"),
  petPolicy: z.string().min(1, "Pet policy is required"),
  parkingType: z.string().min(1, "Parking type is required"),
});

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain lowercase alphanumeric characters and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  detailedDescription: z
    .string()
    .min(20, "Detailed description must be at least 20 characters"),
  location: z.string().min(3, "Location is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),
  bedrooms: z.coerce
    .number()
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: z.coerce
    .number()
    .min(0, "Bathrooms cannot be negative"),
  areaSqFt: z.coerce
    .number()
    .positive("Area must be greater than 0"),
  isFeatured: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  mainImage: z.string().url("Main image must be a valid URL"),
  images: z
    .array(
      z.object({
        url: z.string().url("Must be a valid image URL"),
      })
    )
    .min(1, "At least one additional image is required"),
  amenities: z
    .array(
      z.object({
        name: z.string().min(1, "Amenity name cannot be empty"),
      })
    )
    .min(1, "At least one amenity is required"),
  categoryId: z.string().min(1, "Category is required"),
  overview: propertyOverviewSchema,
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
