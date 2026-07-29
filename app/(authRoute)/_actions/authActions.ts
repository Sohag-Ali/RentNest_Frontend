"use server";

import { LoginFormValues } from "@/lib/validations/login.schema";
import { RegisterFormData } from "@/lib/validations/registration.schema";

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
        return result;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || "Something went wrong. Please try again later.",
        };
    }
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
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    const result = await res.json();

    return result;
}
