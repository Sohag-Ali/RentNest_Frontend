"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface UpdateProfilePayload {
  avatar?: string;
  phone?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  occupation?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  [key: string]: any;
}

/**
 * Whitelist of exact fields accepted by the backend PATCH /api/auth/me endpoint.
 * Any other fields (such as id, name, email, role, status, createdAt, etc.) MUST be stripped out
 * because the backend uses Zod .strict() validation.
 */
const ALLOWED_PROFILE_FIELDS = new Set([
  "avatar",
  "phone",
  "bio",
  "gender",
  "dateOfBirth",
  "occupation",
  "address",
  "city",
  "state",
  "country",
  "zipCode",
  "website",
  "github",
  "linkedin",
  "facebook",
]);

export async function updateUserProfile(data: UpdateProfilePayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authentication required. Please log in.",
      };
    }

    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

    // Build clean body payload: ONLY include allowed fields and omit empty/null/undefined values
    const bodyPayload: Record<string, any> = {};

    Object.keys(data).forEach((key) => {
      // 1. Omit unallowed/read-only fields to avoid Zod .strict() unrecognized key errors
      if (!ALLOWED_PROFILE_FIELDS.has(key)) {
        return;
      }

      const val = data[key];
      if (val !== undefined && val !== null) {
        if (typeof val === "string") {
          const trimmed = val.trim();
          if (trimmed !== "") {
            // Gender normalization: must be MALE or FEMALE
            if (key === "gender") {
              const upper = trimmed.toUpperCase();
              if (upper === "MALE" || upper === "FEMALE") {
                bodyPayload[key] = upper;
              }
            } else {
              bodyPayload[key] = trimmed;
            }
          }
        } else {
          bodyPayload[key] = val;
        }
      }
    });

    // Requirement 13: Print the final payload in console before sending
    console.log("PATCH Payload", bodyPayload);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    };

    // Primary: PATCH /api/auth/me
    let res = await fetch(`${API_URL}/api/auth/me`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(bodyPayload),
      cache: "no-store",
    });

    // Fallback 1: PUT /api/auth/me if 405 Method Not Allowed
    if (res.status === 405) {
      res = await fetch(`${API_URL}/api/auth/me`, {
        method: "PUT",
        headers,
        body: JSON.stringify(bodyPayload),
        cache: "no-store",
      });
    }

    // Fallback 2: PATCH /api/users/profile if 404 Not Found
    if (res.status === 404) {
      res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(bodyPayload),
        cache: "no-store",
      });
    }

    const result = await res.json();

    if (result.success) {
      revalidatePath("/profile");
      revalidatePath("/dashboard/landlord/profile");
      revalidatePath("/dashboard/tenant/profile");
      revalidatePath("/dashboard/admin/profile");
    }

    return result;
  } catch (error: any) {
    console.error("Error updating profile via API:", error);
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to update profile due to network or server error",
    };
  }
}
