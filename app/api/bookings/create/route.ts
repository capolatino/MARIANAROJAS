import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { bookingSchema } from '../../../../lib/validations'
import { addMinutes } from '../../../../lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Verificar que el servicio existe y está activo
    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId }
    })

    if (!service || !service.isActive) {
      return NextResponse.json(
        { success: false, error: 'Servicio no disponible' },
        { status: 400 }
      )
    }

    // Verificar que el cliente existe
    const customer = await prisma.customer.findUnique({
      where: { id: validatedData.customerId }
    })

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Cliente no encontrado' },
        { status: 400 }
      )
    }

    // Verificar disponibilidad una vez más
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        status: {
          in: ['CONFIRMED', 'PENDING_PAYMENT']
        },
        OR: [
          {
            startsAt: {
              lt: validatedData.endsAt
            },
            endsAt: {
              gt: validatedData.startsAt
            }
          }
        ]
      }
    })

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'El horario seleccionado ya no está disponible' },
        { status: 400 }
      )
    }

    // Crear el booking
    const booking = await prisma.booking.create({
      data: {
        customerId: validatedData.customerId,
        serviceId: validatedData.serviceId,
        startsAt: validatedData.startsAt,
        endsAt: validatedData.endsAt,
        status: 'PENDING_PAYMENT',
        note: validatedData.note
      },
      include: {
        customer: true,
        service: true
      }
    })

    // Calcular monto de la seña
    const depositAmount = Math.round(service.price * service.depositPercent / 100)

    return NextResponse.json({
      success: true,
      booking,
      depositAmount,
      message: 'Reserva creada exitosamente'
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

