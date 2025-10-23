import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} a las ${formatTime(date)}`
}

export function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  return result
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString()
}

export function getTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  existingBookings: Array<{ startsAt: Date; endsAt: Date }>,
  blocks: Array<{ startsAt: Date; endsAt: Date }>
): Array<{ time: Date; available: boolean }> {
  const slots: Array<{ time: Date; available: boolean }> = []
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  const start = new Date()
  start.setHours(startHour, startMinute, 0, 0)
  
  const end = new Date()
  end.setHours(endHour, endMinute, 0, 0)
  
  let current = new Date(start)
  
  while (current < end) {
    const slotEnd = addMinutes(current, duration)
    
    if (slotEnd <= end) {
      const isBooked = existingBookings.some(booking => 
        (current >= booking.startsAt && current < booking.endsAt) ||
        (slotEnd > booking.startsAt && slotEnd <= booking.endsAt) ||
        (current <= booking.startsAt && slotEnd >= booking.endsAt)
      )
      
      const isBlocked = blocks.some(block =>
        (current >= block.startsAt && current < block.endsAt) ||
        (slotEnd > block.startsAt && slotEnd <= block.endsAt) ||
        (current <= block.startsAt && slotEnd >= block.endsAt)
      )
      
      const isPast = current < new Date()
      
      slots.push({
        time: new Date(current),
        available: !isBooked && !isBlocked && !isPast
      })
    }
    
    current = addMinutes(current, 15) // Slots cada 15 minutos
  }
  
  return slots
}

