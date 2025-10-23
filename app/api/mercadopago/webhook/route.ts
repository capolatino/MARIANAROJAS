import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { sendConfirmationEmail } from '../../../../lib/email'

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
    const { type, data } = body

    // Solo procesar eventos de pago
    if (type !== 'payment') {
      return NextResponse.json({ success: true, message: 'Evento no relevante' })
    }

    const paymentId = data.id
    if (!paymentId) {
      return NextResponse.json(
        { success: false, error: 'ID de pago no encontrado' },
        { status: 400 }
      )
    }

    // Obtener detalles del pago desde Mercado Pago
    const payment = new Payment(client)
    const paymentDetails = await payment.get({ id: paymentId })

    const externalReference = paymentDetails.external_reference
    if (!externalReference) {
      return NextResponse.json(
        { success: false, error: 'Referencia externa no encontrada' },
        { status: 400 }
      )
    }

    // Verificar que transaction_amount existe
    if (paymentDetails.transaction_amount === undefined) {
      return NextResponse.json(
        { success: false, error: 'Monto de transacción no encontrado' },
        { status: 400 }
      )
    }

    // Buscar el pago en nuestra base de datos
    const dbPayment = await prisma.payment.findFirst({
      where: {
        bookingId: externalReference,
        mpPaymentId: paymentId
      },
      include: {
        booking: {
          include: {
            customer: true,
            service: true
          }
        }
      }
    })

    if (!dbPayment) {
      // Crear registro de pago si no existe
      const newPayment = await prisma.payment.create({
        data: {
          bookingId: externalReference,
          provider: 'MERCADOPAGO',
          mpPaymentId: paymentId,
          amount: paymentDetails.transaction_amount,
          status: paymentDetails.status === 'approved' ? 'APPROVED' : 'PENDING'
        },
        include: {
          booking: {
            include: {
              customer: true,
              service: true
            }
          }
        }
      })

        // Si el pago está aprobado, confirmar el booking
        if (paymentDetails.status === 'approved') {
          await prisma.booking.update({
            where: { id: externalReference },
            data: { status: 'CONFIRMED' }
          })

          // Enviar email de confirmación
          try {
            await sendConfirmationEmail(newPayment.booking)
          } catch (error) {
            console.error('Error sending confirmation email:', error)
          }
        }

      return NextResponse.json({
        success: true,
        message: 'Pago procesado exitosamente',
        paymentId: newPayment.id
      })
    }

    // Actualizar estado del pago existente
    const updatedPayment = await prisma.payment.update({
      where: { id: dbPayment.id },
      data: {
        status: paymentDetails.status === 'approved' ? 'APPROVED' : 'PENDING',
        amount: paymentDetails.transaction_amount
      }
    })

    // Si el pago está aprobado, confirmar el booking
    if (paymentDetails.status === 'approved' && dbPayment.booking.status === 'PENDING_PAYMENT') {
      await prisma.booking.update({
        where: { id: externalReference },
        data: { status: 'CONFIRMED' }
      })

      // Enviar email de confirmación
      try {
        await sendConfirmationEmail(dbPayment.booking)
      } catch (error) {
        console.error('Error sending confirmation email:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pago actualizado exitosamente',
      paymentId: updatedPayment.id
    })
  } catch (error) {
    console.error('Error processing Mercado Pago webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar webhook' },
      { status: 500 }
    )
  }
}

// Manejar GET para verificación del webhook
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    success: true, 
    message: 'Webhook endpoint activo',
    timestamp: new Date().toISOString()
  })
}
