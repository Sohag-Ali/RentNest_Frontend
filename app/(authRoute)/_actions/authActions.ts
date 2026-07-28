"use server";

import { LoginFormValues } from "@/lib/validations/login.schema";
import { RegisterFormData } from "@/lib/validations/registration.schema";


export async function loginAction(data: LoginFormValues) {
    const res = await fetch("http://localhost:5000/api/auth/login", {
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


type RegisterPayload = Omit<RegisterFormData, "confirmPassword">;
export async function registerAction(data: RegisterPayload) {
    const res = await fetch("http://localhost:5000/api/auth/register", {
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
