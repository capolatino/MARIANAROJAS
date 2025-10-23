import { z } from "zod"

export const customerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  consent: z.boolean().refine(val => val === true, "Debes aceptar las comunicaciones"),
})

export const bookingSchema = z.object({
  customerId: z.string().min(1, "Cliente requerido"),
  serviceId: z.string().min(1, "Servicio requerido"),
  startsAt: z.date(),
  endsAt: z.date(),
  note: z.string().optional(),
})

export const adminLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const serviceSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  category: z.enum(["Uñas", "Pestañas"]),
  durationMin: z.number().min(15, "La duración mínima es 15 minutos"),
  price: z.number().min(0, "El precio debe ser mayor a 0"),
  depositPercent: z.number().min(10, "El porcentaje mínimo es 10%").max(50, "El porcentaje máximo es 50%"),
  isActive: z.boolean().default(true),
})

export const availabilityBlockSchema = z.object({
  startsAt: z.date(),
  endsAt: z.date(),
  reason: z.string().optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
export type AdminLoginFormData = z.infer<typeof adminLoginSchema>
export type ServiceFormData = z.infer<typeof serviceSchema>
export type AvailabilityBlockFormData = z.infer<typeof availabilityBlockSchema>

