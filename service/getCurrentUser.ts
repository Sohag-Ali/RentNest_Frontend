"use server";

import { cookies } from "next/headers";
import { UserResponse } from "@/lib/types/user.type";

export async function getCurrentUser(): Promise<UserResponse> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || null;

        if (!accessToken) {
            return {
                success: false,
                data: null,
                message: "User not logged in",
                statusCode: 401,
            };
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`,
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error?.message || "Failed to fetch user",
            statusCode: 500,
        };
    }
}