import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, amount, customerEmail, customerName } = body

    if (!bookingId || !amount || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Datos requeridos faltantes' },
        { status: 400 }
      )
    }

    // Verificar que el booking existe
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        customer: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Reserva no encontrada' },
        { status: 404 }
      )
    }

    // Crear preferencia de pago
    const preference = new Preference(client)

    const preferenceData = {
      items: [
        {
          id: bookingId,
          title: `Seña - ${booking.service.name}`,
          description: `Seña del 30% para ${booking.service.name}`,
          quantity: 1,
          unit_price: amount,
          currency_id: 'ARS'
        }
      ],
      payer: {
        name: customerName || booking.customer.name,
        email: customerEmail
      },
      back_urls: {
        success: `${process.env.SITE_URL}/turnos/resultado?status=success&bookingId=${bookingId}`,
        failure: `${process.env.SITE_URL}/turnos/resultado?status=failure&bookingId=${bookingId}`,
        pending: `${process.env.SITE_URL}/turnos/resultado?status=pending&bookingId=${bookingId}`
      },
      notification_url: `${process.env.SITE_URL}/api/mercadopago/webhook`,
      external_reference: bookingId,
      auto_return: 'approved',
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1
      }
    }

    const response = await preference.create({ body: preferenceData })

    // Crear registro de pago
    const payment = await prisma.payment.create({
      data: {
        bookingId: bookingId,
        provider: 'MERCADOPAGO',
        preferenceId: response.id,
        amount: amount,
        status: 'PENDING'
      }
    })

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      initPoint: response.init_point,
      paymentId: payment.id
    })
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear preferencia de pago' },
      { status: 500 }
    )
  }
}

