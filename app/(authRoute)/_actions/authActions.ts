"use server";

import { LoginFormValues } from "@/lib/validations/login.schema";
import { RegisterFormData } from "@/lib/validations/registration.schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
} | null;

export async function loginAction(prevState: LoginState, data: LoginFormValues) {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (result.success) {
            const cookieStore = await cookies();

            await cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path:"/",
               
            });
            await cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
                path:"/",
                
            });


        }

        return result;
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
        return {
            success: false,
            statusCode: 500,
            message: errMessage,
        };
    }
}



export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    redirect("/auth/login");
}

export type RegisterState = {
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
} | null;

type RegisterPayload = Omit<RegisterFormData, "confirmPassword">;
export async function registerAction(prevState: RegisterState, data: RegisterPayload) {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        const result = await res.json();

        if (result.success) {
            let tokenData = result.data;

            // If register API doesn't return accessToken directly, perform auto-login with credentials
            if (!tokenData?.accessToken && data.email && data.password) {
                const loginRes = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: data.email, password: data.password }),
                    cache: "no-store",
                });
                const loginResult = await loginRes.json();
                if (loginResult.success && loginResult.data?.accessToken) {
                    tokenData = loginResult.data;
                }
            }

            if (tokenData?.accessToken) {
                const cookieStore = await cookies();

                await cookieStore.set("accessToken", tokenData.accessToken, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24,
                    path:"/"
                   
                });
                if (tokenData?.refreshToken) {
                    await cookieStore.set("refreshToken", tokenData.refreshToken, {
                        httpOnly: true,
                        sameSite: "lax",
                        maxAge: 60 * 60 * 24 * 7,
                        path:"/",
                    });
                }
            }
        }

        return result;
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
        return {
            success: false,
            statusCode: 500,
            message: errMessage,
        };
    }
}

export type GoogleLoginState = {
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: {
        accessToken: string;
        refreshToken?: string;
        user?: {
            id?: string;
            name?: string;
            email?: string;
            role?: string;
            [key: string]: unknown;
        };
    };
} | null;

export async function googleLoginAction(credential: string): Promise<GoogleLoginState> {
    try {
        const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${backendUrl}/api/auth/google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential }),
            cache: "no-store",
        });

        const result = await res.json();

        if (result.success && result.data?.accessToken) {
            const cookieStore = await cookies();

            await cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24,
                path: "/",
            });

            if (result.data?.refreshToken) {
                await cookieStore.set("refreshToken", result.data.refreshToken, {
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/",
                });
            }
        }

        return result;
    } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : "Google authentication failed. Please try again later.";
        return {
            success: false,
            statusCode: 500,
            message: errMessage,
        };
    }
}

