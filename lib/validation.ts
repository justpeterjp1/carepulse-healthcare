import { z } from "zod";

export const patientFormSchema =  z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.'),
  email: z
    .string()
    .email('Please enter a valid email address.'),
  phoneNumber: z
    .string()
    .min(10, 'Phone must be at least 10 characters.')
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number")
    .optional(),
  
})

