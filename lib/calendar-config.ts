import { siteConfig } from './site'

export const calendarConfig = {
  // Horarios de trabajo por día de la semana
  workingHours: {
    monday: { start: '09:00', end: '18:00', isOpen: true },
    tuesday: { start: '09:00', end: '18:00', isOpen: true },
    wednesday: { start: '09:00', end: '18:00', isOpen: true },
    thursday: { start: '09:00', end: '18:00', isOpen: true },
    friday: { start: '09:00', end: '18:00', isOpen: true },
    saturday: { start: '09:00', end: '16:00', isOpen: true },
    sunday: { start: '09:00', end: '16:00', isOpen: false },
  },
  
  // Intervalos de tiempo para slots
  timeSlotInterval: 15, // minutos
  
  // Días de anticipación mínima para reservas
  minAdvanceDays: 1,
  
  // Días de anticipación máxima para reservas
  maxAdvanceDays: 60,
  
  // Duración mínima de turno
  minBookingDuration: 30, // minutos
  
  // Duración máxima de turno
  maxBookingDuration: 180, // minutos
  
  // Zona horaria
  timezone: siteConfig.timezone,
  
  // Días de la semana en español
  weekDays: [
    'Domingo',
    'Lunes', 
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ],
  
  // Meses en español
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
}

