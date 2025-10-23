import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { customerSchema } from '../../../lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = customerSchema.parse(body)

    // Buscar cliente existente por email
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: validatedData.email }
    })

    if (existingCustomer) {
      // Actualizar datos del cliente existente
      const updatedCustomer = await prisma.customer.update({
        where: { id: existingCustomer.id },
        data: {
          name: validatedData.name,
          phone: validatedData.phone,
          consent: validatedData.consent,
        }
      })

      return NextResponse.json({
        success: true,
        customer: updatedCustomer,
        message: 'Cliente actualizado exitosamente'
      })
    } else {
      // Crear nuevo cliente
      const newCustomer = await prisma.customer.create({
        data: validatedData
      })

      return NextResponse.json({
        success: true,
        customer: newCustomer,
        message: 'Cliente creado exitosamente'
      })
    }
  } catch (error) {
    console.error('Error creating/updating customer:', error)
    
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email requerido' },
        { status: 400 }
      )
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
      include: {
        bookings: {
          include: {
            service: true,
            payment: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      customer
    })
  } catch (error) {
    console.error('Error fetching customer:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

