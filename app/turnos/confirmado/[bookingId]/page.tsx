'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { Badge } from '../../../../components/ui/badge'
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Download, 
  Share2,
  ArrowLeft,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatDate, formatTime } from '../../../../lib/utils'

interface BookingData {
  id: string
  service: string
  category: string
  date: Date
  time: string
  duration: number
  price: number
  deposit: number
  status: 'CONFIRMED' | 'PENDING_PAYMENT' | 'CANCELLED'
  customer: {
    name: string
    email: string
    phone: string
  }
  payment: {
    status: 'APPROVED' | 'PENDING' | 'REJECTED'
    method: string
    transactionId?: string
  }
  note?: string
}

export default function ConfirmadoPage() {
  const params = useParams()
  const bookingId = params.bookingId as string
  const [booking, setBooking] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos del turno
    const mockBooking: BookingData = {
      id: bookingId,
      service: 'Manicura Semipermanente',
      category: 'Uñas',
      date: new Date('2024-01-15'),
      time: '14:00',
      duration: 60,
      price: 3500,
      deposit: 1050,
      status: 'CONFIRMED',
      customer: {
        name: 'María González',
        email: 'maria@email.com',
        phone: '+54 9 11 1234-5678'
      },
      payment: {
        status: 'APPROVED',
        method: 'Mercado Pago',
        transactionId: 'MP-123456789'
      },
      note: 'Preferencia por colores neutros'
    }
    
    setTimeout(() => {
      setBooking(mockBooking)
      setLoading(false)
    }, 1000)
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mariana-rose mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando detalles del turno...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white flex items-center justify-center">
        <Card className="mariana-card max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Turno No Encontrado</CardTitle>
            <CardDescription>
              No pudimos encontrar el turno solicitado. Verifica el código e intenta nuevamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="mariana-button">
              <Link href="/turnos">
                Hacer Nueva Reserva
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusConfig = () => {
    switch (booking.status) {
      case 'CONFIRMED':
        return {
          text: 'Confirmado',
          variant: 'default' as const,
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        }
      case 'PENDING_PAYMENT':
        return {
          text: 'Pendiente de Pago',
          variant: 'secondary' as const,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        }
      case 'CANCELLED':
        return {
          text: 'Cancelado',
          variant: 'destructive' as const,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        }
      default:
        return {
          text: 'Desconocido',
          variant: 'secondary' as const,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Detalles del Turno
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Código de reserva: #{booking.id}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Estado del turno */}
              <Card className="mariana-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Estado del Turno</CardTitle>
                    <Badge variant={statusConfig.variant} className="text-lg px-4 py-2">
                      {statusConfig.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${statusConfig.bgColor} rounded-full flex items-center justify-center`}>
                      <CheckCircle className={`h-6 w-6 ${statusConfig.color}`} />
                    </div>
                    <div>
                      <p className="font-medium">Turno {statusConfig.text.toLowerCase()}</p>
                      <p className="text-sm text-gray-600">
                        {booking.status === 'CONFIRMED' 
                          ? 'Tu turno está confirmado y listo para el día programado'
                          : booking.status === 'PENDING_PAYMENT'
                          ? 'Esperando confirmación del pago'
                          : 'Este turno ha sido cancelado'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detalles del servicio */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Detalles del Servicio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-mariana-rose" />
                      <div>
                        <p className="text-sm text-gray-600">Fecha</p>
                        <p className="font-medium">{formatDate(booking.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-mariana-rose" />
                      <div>
                        <p className="text-sm text-gray-600">Hora</p>
                        <p className="font-medium">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-mariana-rose" />
                      <div>
                        <p className="text-sm text-gray-600">Servicio</p>
                        <p className="font-medium">{booking.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-mariana-rose" />
                      <div>
                        <p className="text-sm text-gray-600">Duración</p>
                        <p className="font-medium">{booking.duration} minutos</p>
                      </div>
                    </div>
                  </div>
                  
                  {booking.note && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Nota especial:</p>
                      <p className="font-medium">{booking.note}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Información de pago */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Información de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio total:</span>
                      <span className="font-medium">{formatPrice(booking.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seña pagada:</span>
                      <span className="font-medium text-mariana-rose">{formatPrice(booking.deposit)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-600">Saldo pendiente:</span>
                      <span className="font-medium">{formatPrice(booking.price - booking.deposit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Método de pago:</span>
                      <span className="text-gray-500">{booking.payment.method}</span>
                    </div>
                    {booking.payment.transactionId && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ID de transacción:</span>
                        <span className="text-gray-500 font-mono">{booking.payment.transactionId}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Acciones rápidas */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <a href="#" download="turno.ics">
                      <Download className="h-4 w-4 mr-2" />
                      Agregar al Calendario
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="#" onClick={() => navigator.share?.({ title: 'Mi turno', text: `Turno confirmado para ${formatDate(booking.date)} a las ${booking.time}` })}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <a href="/contacto">
                      <Phone className="h-4 w-4 mr-2" />
                      Contactar
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Información de contacto */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-mariana-rose" />
                    <div>
                      <p className="text-sm text-gray-600">Cliente</p>
                      <p className="font-medium">{booking.customer.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-mariana-rose" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-sm">{booking.customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-mariana-rose" />
                    <div>
                      <p className="text-sm text-gray-600">Teléfono</p>
                      <p className="font-medium">{booking.customer.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ubicación */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-mariana-rose mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Dirección</p>
                      <p className="font-medium text-sm">Av. Corrientes 1234, CABA</p>
                      <Button asChild size="sm" variant="outline" className="mt-2">
                        <a 
                          href="https://maps.google.com/?q=Av.+Corrientes+1234,+CABA"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver en Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Información importante */}
          <Card className="mariana-card mt-8">
            <CardHeader>
              <CardTitle>Información Importante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Antes de tu turno:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Llega 10 minutos antes</li>
                    <li>• Trae una identificación</li>
                    <li>• Evita usar cremas en las manos</li>
                    <li>• Si tienes alergias, infórmanos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Políticas:</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Cancelación con 24hs de anticipación</li>
                    <li>• El saldo se paga al finalizar</li>
                    <li>• Duración estimada del servicio</li>
                    <li>• Productos de calidad premium</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild className="mariana-button">
              <Link href="/turnos">
                Hacer Nueva Reserva
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

