import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit mobile number starting with 6-9.' }),
  vehicleNumber: z.string().transform((val) => val.trim().toUpperCase()).optional().or(z.literal('')),
  insuranceType: z.string().min(1, { message: 'Please select an insurance type.' }),
  message: z.string().optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, { message: 'Please enter a valid 10-digit mobile number starting with 6-9.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional().or(z.literal('')),
  vehicleType: z.string().min(1, { message: 'Please select a vehicle type.' }),
  vehicleMake: z.string().min(1, { message: 'Please enter the vehicle brand/make.' }),
  vehicleModel: z.string().min(1, { message: 'Please enter the vehicle model.' }),
  registrationYear: z.number().int().min(1990, { message: 'Year must be 1990 or later.' }).max(new Date().getFullYear() + 1, { message: 'Year cannot be in the far future.' }),
  insuranceType: z.string().min(1, { message: 'Please select the insurance type.' }),
  previousPolicyExpiry: z.string().optional().or(z.literal('')),
  message: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
