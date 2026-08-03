"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface CreateReviewPayload {
  rentalRequestId: string;
  rating: number;
  comment: string;
}

export interface ReviewItem {
  id: string;
  tenantId: string;
  propertyId: string;
  rentalRequestId: string;
  rating: number;
  comment: string;
  createdAt: string;
  tenant?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  property?: {
    id: string;
    title: string;
    location: string;
  };
}

export interface ReviewResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: ReviewItem | null;
  errors?: any;
}

/**
 * Server Action: Submit a property review & rating
 * Target API: POST /api/reviews
 */
export async function createReviewAction(payload: CreateReviewPayload): Promise<ReviewResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authentication required. Please log in to leave a review.",
      };
    }

    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    };

    const bodyPayload = {
      rentalRequestId: payload.rentalRequestId,
      rating: Number(payload.rating),
      comment: payload.comment.trim(),
    };

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyPayload),
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/tenant/requests");
      revalidatePath("/dashboard/landlord/reviews");
      revalidatePath("/properties");
    }

    return result;
  } catch (error: any) {
    console.error("Error submitting review:", error);
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to submit review due to network or server error",
    };
  }
}

export interface MyReviewItem {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  rentalRequestId: string;
  property?: {
    id: string;
    title: string;
    slug?: string;
    location?: string;
    city?: string;
    state?: string;
    price?: number;
    mainImage?: string;
    isAvailable?: boolean;
    rating?: number;
    reviewCount?: number;
    category?: {
      id: string;
      name: string;
    };
  };
}

/**
 * Server Action: Get property reviews
 * Target API: GET /api/reviews
 */
export async function getReviewsAction(propertyId?: string): Promise<{ success: boolean; data: ReviewItem[] }> {
  try {
    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";
    const url = propertyId ? `${API_URL}/api/reviews?propertyId=${propertyId}` : `${API_URL}/api/reviews`;
    
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { success: false, data: [] };
    }
    const result = await res.json();
    return {
      success: result.success || true,
      data: Array.isArray(result.data) ? result.data : [],
    };
  } catch (error) {
    return { success: false, data: [] };
  }
}

/**
 * Server Action: Fetch reviews submitted by the currently logged-in tenant
 * Target API: GET https://rentnest-backend-ezd1.onrender.com/api/reviews/me
 */
export async function getMyReviewsAction(): Promise<{ success: boolean; data: MyReviewItem[] }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, data: [] };
    }

    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/api/reviews/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, data: [] };
    }

    const result = await res.json();
    return {
      success: result.success || true,
      data: Array.isArray(result.data) ? result.data : [],
    };
  } catch (error) {
    console.error("Error fetching my reviews:", error);
    return { success: false, data: [] };
  }
}

export interface UpdateReviewPayload {
  rating?: number | string;
  comment?: string;
  [key: string]: any;
}

/**
 * Server Action: Update an existing review
 * Target API: PATCH /api/reviews/:id
 */
export async function updateReviewAction(
  reviewId: string,
  rawPayload: UpdateReviewPayload
): Promise<ReviewResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authentication required. Please log in to update your review.",
      };
    }

    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

    // Strictly whitelist and sanitize ONLY allowed fields: rating (number) and comment (string)
    const payload: Record<string, any> = {};

    if (rawPayload.rating !== undefined && rawPayload.rating !== null && rawPayload.rating !== "") {
      const numRating = Number(rawPayload.rating);
      if (!isNaN(numRating) && numRating >= 1 && numRating <= 5) {
        payload.rating = Math.floor(numRating);
      }
    }

    if (rawPayload.comment && typeof rawPayload.comment === "string") {
      const trimmedComment = rawPayload.comment.trim();
      if (trimmedComment.length > 0) {
        payload.comment = trimmedComment;
      }
    }

    // Requirement 9: Print final sanitized payload before sending request
    console.log("Review Update Payload", payload);

    const res = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/tenant/reviews");
      revalidatePath("/dashboard/tenant/requests");
      revalidatePath("/dashboard/landlord/reviews");
      revalidatePath("/properties");
    }

    return result;
  } catch (error: any) {
    console.error("Error updating review:", error);
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to update review",
    };
  }
}

/**
 * Server Action: Delete a review
 * Target API: DELETE /api/reviews/:id
 */
export async function deleteReviewAction(reviewId: string): Promise<ReviewResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authentication required. Please log in to delete your review.",
      };
    }

    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/tenant/reviews");
      revalidatePath("/dashboard/tenant/requests");
      revalidatePath("/dashboard/landlord/reviews");
      revalidatePath("/properties");
    }

    return result;
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to delete review",
    };
  }
}
