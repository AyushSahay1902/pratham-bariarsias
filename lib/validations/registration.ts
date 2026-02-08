import { z } from 'zod'

export const registrationSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
