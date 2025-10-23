import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')

    const where: any = {}
    
    if (category) {
      where.category = category
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { price: 'asc' }
      ]
    })

    return NextResponse.json({
      success: true,
      services
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

