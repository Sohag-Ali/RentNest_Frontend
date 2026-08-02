import { z } from 'zod';

const optionalUrl = (errorMessage: string) =>
  z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        const trimmed = val.trim();
        const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
        try {
          new URL(formatted);
          return true;
        } catch {
          return false;
        }
      },
      { message: errorMessage }
    );

/**
 * Zod validation schema for User Profile Updates.
 * Designed to strictly match React Hook Form field types and backend expectations.
 */
export const profileUpdateSchema = z.object({
  avatar: optionalUrl('Invalid Avatar URL format'),
  phone: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE']).optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  occupation: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  state: z.string().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  zipCode: z.string().optional().or(z.literal('')),
  website: optionalUrl('Invalid Website URL format'),
  github: optionalUrl('Invalid GitHub URL format'),
  linkedin: optionalUrl('Invalid LinkedIn URL format'),
  facebook: optionalUrl('Invalid Facebook URL format'),
});

export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>;
