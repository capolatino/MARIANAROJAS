'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Calendar, CreditCard, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatDate, formatTime } from '@/lib/utils'

type PaymentStatus = 'success' | 'pending' | 'failure'

export default function ResultadoPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<PaymentStatus>('pending')
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular verificación del estado del pago
    const paymentStatus = searchParams.get('status') as PaymentStatus
    const booking = searchParams.get('bookingId')
    
    setBookingId(booking)
    setStatus(paymentStatus || 'pending')
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mariana-rose mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando estado del pago...</p>
        </div>
      </div>
    )
  }

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          title: '¡Pago Exitoso!',
          description: 'Tu turno ha sido confirmado exitosamente',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          badge: { text: 'Confirmado', variant: 'default' as const }
        }
      case 'pending':
        return {
          icon: Clock,
          title: 'Pago Pendiente',
          description: 'Estamos procesando tu pago. Te notificaremos cuando esté confirmado',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          badge: { text: 'Pendiente', variant: 'secondary' as const }
        }
      case 'failure':
        return {
          icon: XCircle,
          title: 'Pago Fallido',
          description: 'Hubo un problema con tu pago. Por favor, intenta nuevamente',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          badge: { text: 'Fallido', variant: 'destructive' as const }
        }
      default:
        return {
          icon: Clock,
          title: 'Procesando',
          description: 'Estamos verificando tu pago',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          badge: { text: 'Procesando', variant: 'secondary' as const }
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  // Datos simulados del turno
  const bookingData = {
    id: bookingId || 'MR-2024-001',
    service: 'Manicura Semipermanente',
    date: new Date('2024-01-15'),
    time: '14:00',
    duration: 60,
    price: 3500,
    deposit: 1050,
    customer: 'María González',
    email: 'maria@email.com',
    phone: '+54 9 11 1234-5678'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Estado del Pago
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="mariana-card">
            <CardHeader className="text-center">
              <div className={`mx-auto w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mb-6`}>
                <Icon className={`h-10 w-10 ${config.color}`} />
              </div>
              <CardTitle className={`text-3xl ${config.color}`}>
                {config.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {config.description}
              </CardDescription>
              <div className="mt-4">
                <Badge variant={config.badge.variant} className="text-lg px-4 py-2">
                  {config.badge.text}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Detalles del turno */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Detalles de tu Reserva</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-mariana-rose mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Fecha</p>
                        <p className="font-medium">{formatDate(bookingData.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-mariana-rose mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Hora</p>
                        <p className="font-medium">{bookingData.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Servicio</p>
                      <p className="font-medium">{bookingData.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duración</p>
                      <p className="font-medium">{bookingData.duration} minutos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de pago */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Información de Pago</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Precio total:</span>
                    <span className="font-medium">{formatPrice(bookingData.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seña pagada:</span>
                    <span className="font-medium text-mariana-rose">{formatPrice(bookingData.deposit)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Saldo pendiente:</span>
                    <span className="font-medium">{formatPrice(bookingData.price - bookingData.deposit)}</span>
                  </div>
                </div>
              </div>

              {/* Acciones según el estado */}
              {status === 'success' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">¡Todo listo!</h4>
                    <p className="text-green-700 text-sm">
                      Te hemos enviado un email de confirmación con todos los detalles. 
                      También puedes agregar el evento a tu calendario.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="mariana-button flex-1">
                      <a href={`/turnos/confirmado/${bookingData.id}`}>
                        Ver Detalles Completos
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href="#" download="turno.ics">
                        <Download className="h-4 w-4 mr-2" />
                        Agregar al Calendario
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {status === 'pending' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Pago en Proceso</h4>
                    <p className="text-yellow-700 text-sm">
                      Tu pago está siendo procesado. Te notificaremos por email cuando esté confirmado.
                      Esto puede tomar unos minutos.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="mariana-button flex-1">
                      <a href={`/turnos/confirmado/${bookingData.id}`}>
                        Ver Estado Actual
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href="/turnos">
                        Hacer Nueva Reserva
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {status === 'failure' && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Pago No Procesado</h4>
                    <p className="text-red-700 text-sm">
                      Hubo un problema con tu pago. Por favor, verifica tus datos y vuelve a intentar.
                      Si el problema persiste, contáctanos.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="mariana-button flex-1">
                      <a href="/turnos">
                        Intentar Nuevamente
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href="/contacto">
                        Contactar Soporte
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* Información adicional */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Información Importante</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Llega 10 minutos antes de tu turno</li>
                  <li>• Trae una identificación válida</li>
                  <li>• Si necesitas cancelar, hazlo con 24hs de anticipación</li>
                  <li>• El saldo restante se abona al finalizar el servicio</li>
                </ul>
              </div>

              {/* Botón de regreso */}
              <div className="text-center pt-4">
                <Button asChild variant="outline">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Inicio
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

