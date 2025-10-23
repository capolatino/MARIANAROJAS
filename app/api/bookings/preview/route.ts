import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'
import { addMinutes } from '../../../../lib/utils'

const previewSchema = z.object({
  serviceId: z.string(),
  startsAt: z.string().datetime(),
  duration: z.number()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, startsAt, duration } = previewSchema.parse(body)

    const startDate = new Date(startsAt)
    const endDate = addMinutes(startDate, duration)

    // Verificar si el servicio existe y está activo
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service || !service.isActive) {
      return NextResponse.json(
        { success: false, error: 'Servicio no disponible' },
        { status: 400 }
      )
    }

    // Verificar disponibilidad
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        status: {
          in: ['CONFIRMED', 'PENDING_PAYMENT']
        },
        OR: [
          {
            startsAt: {
              lt: endDate
            },
            endsAt: {
              gt: startDate
            }
          }
        ]
      }
    })

    // Verificar bloqueos de disponibilidad
    const availabilityBlocks = await prisma.availabilityBlock.findMany({
      where: {
        startsAt: {
          lt: endDate
        },
        endsAt: {
          gt: startDate
        }
      }
    })

    const isAvailable = conflictingBookings.length === 0 && availabilityBlocks.length === 0

    // Calcular monto de la seña
    const depositAmount = Math.round(service.price * service.depositPercent / 100)

    return NextResponse.json({
      success: true,
      available: isAvailable,
      service: {
        id: service.id,
        name: service.name,
        category: service.category,
        duration: service.durationMin,
        price: service.price,
        depositPercent: service.depositPercent,
        depositAmount
      },
      booking: {
        startsAt: startDate,
        endsAt: endDate,
        duration
      },
      conflicts: {
        bookings: conflictingBookings.length,
        blocks: availabilityBlocks.length
      }
    })
  } catch (error) {
    console.error('Error checking availability:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

