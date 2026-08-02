import { z } from 'zod';

/**
 * Zod Validation Schema for Review Updates.
 * Backend strictly accepts ONLY:
 * - rating: number (optional, int 1-5)
 * - comment: string (optional, non-empty after trim)
 * And requires at least one field to be present.
 */
export const updateReviewSchema = z
  .object({
    rating: z
      .number({ message: 'Rating must be a number' })
      .int('Rating must be an integer')
      .min(1, 'Rating must be at least 1 star')
      .max(5, 'Rating cannot exceed 5 stars')
      .optional(),
    comment: z
      .string()
      .trim()
      .min(1, 'Comment cannot be empty')
      .optional(),
  })
  .strict()
  .refine(
    (data) => data.rating !== undefined || (data.comment !== undefined && data.comment.trim() !== ''),
    {
      message: 'At least one field (rating or comment) is required to update a review',
    }
  );

export type UpdateReviewFormValues = z.infer<typeof updateReviewSchema>;
