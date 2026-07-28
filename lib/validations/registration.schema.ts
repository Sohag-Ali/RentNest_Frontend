import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Please enter a valid email address"),

  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain one uppercase letter")
  .regex(/[a-z]/, "Must contain one lowercase letter")
  .regex(/[0-9]/, "Must contain one number")
  .regex(/[^A-Za-z0-9]/, "Must contain one special character"),

  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),

  role: z
    .enum(["TENANT", "LANDLORD"]),
})
.refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;