export const siteConfig = {
  name: "Mariana Rojas",
  description: "Uñas y Pestañas - Reserva tu turno online",
  url: process.env.SITE_URL || "http://localhost:3000",
  business: {
    name: "Mariana Rojas",
    phone: "+54 9 11 1234-5678",
    email: "hola@marianarojas.com",
    address: "Av. Corrientes 1234, CABA",
    instagram: "@marianarojas_nails",
    whatsapp: "+5491112345678",
  },
  colors: {
    primary: "#F6A6C1",
    secondary: "#F6C5D9", 
    accent: "#D7B89C",
    background: "#F9F5F3",
  },
  policies: {
    cancellation: "Las cancelaciones deben realizarse con 24hs de anticipación. En caso de no presentarse, se perderá la seña abonada.",
    deposit: "Se requiere abonar una seña del 30% para confirmar el turno.",
    reschedule: "Los turnos pueden reagendarse hasta 24hs antes sin costo adicional.",
  },
  workingHours: {
    monday: { start: "09:00", end: "18:00", isOpen: true },
    tuesday: { start: "09:00", end: "18:00", isOpen: true },
    wednesday: { start: "09:00", end: "18:00", isOpen: true },
    thursday: { start: "09:00", end: "18:00", isOpen: true },
    friday: { start: "09:00", end: "18:00", isOpen: true },
    saturday: { start: "09:00", end: "16:00", isOpen: true },
    sunday: { start: "09:00", end: "16:00", isOpen: false },
  },
  timezone: "America/Argentina/Buenos_Aires",
}

