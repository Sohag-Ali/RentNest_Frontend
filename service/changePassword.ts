"use server";

import { cookies } from "next/headers";

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export async function changePasswordAction(payload: ChangePasswordPayload) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Authentication required. Please log in again.",
      };
    }

    const API_URL = process.env.BACKEND_API_URL || "https://rentnest-backend-ezd1.onrender.com";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    };

    let res = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (res.status === 404) {
      res = await fetch(`${API_URL}/api/users/change-password`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        cache: "no-store",
      });
    }

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error?.message || "Failed to update password. Please try again later.",
    };
  }
}
