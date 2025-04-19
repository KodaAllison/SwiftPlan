import { z } from 'zod';

export const lessonPlanSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subject: z.string().min(2, 'Please enter a subject'),
  ageGroup: z.enum(['KS1', 'KS2', 'KS3', 'KS4', 'KS5'], {
    errorMap: () => ({ message: 'Select a valid age group' }),
  }),
  duration: z
    .string()
    .min(2, 'Please specify a duration')
    .refine((val) => /^\d+\s*(mins|min|minutes)$/.test(val.trim().toLowerCase()), {
      message: 'Use format like "45 mins"',
    }),
  objective: z.string().min(5, 'Objective must be more descriptive'),
  style: z.string().optional(),
  notes: z.string().optional(),
});
