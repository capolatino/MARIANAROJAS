import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Crear usuario admin
  const adminPassword = process.env.ADMIN_PASSWORD || 'cambiar123'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@marianarojas.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@marianarojas.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin creado:', admin.email)

  // Crear servicios base
  const services = [
    // Uñas
    {
      name: 'Manicura Clásica',
      category: 'Uñas',
      durationMin: 45,
      price: 2500,
      depositPercent: 30,
    },
    {
      name: 'Manicura Semipermanente',
      category: 'Uñas',
      durationMin: 60,
      price: 3500,
      depositPercent: 30,
    },
    {
      name: 'Esmaltado Francés',
      category: 'Uñas',
      durationMin: 60,
      price: 3000,
      depositPercent: 30,
    },
    {
      name: 'Nail Art Básico',
      category: 'Uñas',
      durationMin: 75,
      price: 4000,
      depositPercent: 30,
    },
    // Pestañas
    {
      name: 'Extensiones Clásicas',
      category: 'Pestañas',
      durationMin: 90,
      price: 4500,
      depositPercent: 30,
    },
    {
      name: 'Extensiones Híbridas',
      category: 'Pestañas',
      durationMin: 120,
      price: 5500,
      depositPercent: 30,
    },
    {
      name: 'Lifting de Pestañas',
      category: 'Pestañas',
      durationMin: 60,
      price: 3000,
      depositPercent: 30,
    },
    {
      name: 'Tinte de Pestañas',
      category: 'Pestañas',
      durationMin: 30,
      price: 1500,
      depositPercent: 30,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { 
        name_category: {
          name: service.name,
          category: service.category,
        }
      },
      update: {},
      create: service,
    })
  }

  console.log('✅ Servicios creados:', services.length)

  // Crear algunos bloqueos de ejemplo (feriados)
  const holidays = [
    {
      startsAt: new Date('2024-01-01T00:00:00-03:00'),
      endsAt: new Date('2024-01-01T23:59:59-03:00'),
      reason: 'Año Nuevo',
    },
    {
      startsAt: new Date('2024-05-01T00:00:00-03:00'),
      endsAt: new Date('2024-05-01T23:59:59-03:00'),
      reason: 'Día del Trabajador',
    },
    {
      startsAt: new Date('2024-12-25T00:00:00-03:00'),
      endsAt: new Date('2024-12-25T23:59:59-03:00'),
      reason: 'Navidad',
    },
  ]

  for (const holiday of holidays) {
    await prisma.availabilityBlock.upsert({
      where: {
        startsAt_endsAt: {
          startsAt: holiday.startsAt,
          endsAt: holiday.endsAt,
        }
      },
      update: {},
      create: holiday,
    })
  }

  console.log('✅ Bloqueos de feriados creados:', holidays.length)
  console.log('🎉 Seed completado!')
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
