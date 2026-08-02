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
