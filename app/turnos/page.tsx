'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Clock, User, CreditCard, CheckCircle, ArrowRight } from 'lucide-react'
import { formatPrice, formatDate, formatTime } from '@/lib/utils'

// Simulación de datos (en producción vendrían de la API)
const mockServices = [
  {
    id: '1',
    name: 'Manicura Clásica',
    category: 'Uñas',
    duration: 45,
    price: 2500,
    depositPercent: 30,
    description: 'Corte, limado, cutículas y esmaltado tradicional',
  },
  {
    id: '2',
    name: 'Manicura Semipermanente',
    category: 'Uñas',
    duration: 60,
    price: 3500,
    depositPercent: 30,
    description: 'Esmaltado de larga duración con gel',
  },
  {
    id: '3',
    name: 'Extensiones Clásicas',
    category: 'Pestañas',
    duration: 90,
    price: 4500,
    depositPercent: 30,
    description: 'Pestañas naturales con volumen clásico',
  },
  {
    id: '4',
    name: 'Extensiones Híbridas',
    category: 'Pestañas',
    duration: 120,
    price: 5500,
    depositPercent: 30,
    description: 'Combinación de clásicas y volumen para mayor impacto',
  },
]

const steps = [
  { id: 1, name: 'Datos Personales', icon: User },
  { id: 2, name: 'Servicio', icon: Calendar },
  { id: 3, name: 'Fecha y Hora', icon: Clock },
  { id: 4, name: 'Pago', icon: CreditCard },
  { id: 5, name: 'Confirmación', icon: CheckCircle },
]

export default function TurnosPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(
    searchParams.get('service') || null
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  })

  const service = mockServices.find(s => s.id === selectedService)
  const depositAmount = service ? Math.round(service.price * service.depositPercent / 100) : 0

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    handleNext()
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    // En producción, aquí se cargarían los horarios disponibles
    setSelectedTime('10:00') // Simulación
    handleNext()
  }

  const handlePayment = () => {
    // En producción, aquí se integraría con Mercado Pago
    console.log('Procesando pago...')
    handleNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Reservar Turno
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Reserva tu turno de forma rápida y segura. Solo necesitas unos minutos.
          </p>
        </div>
      </section>

      {/* Progreso */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-mariana-rose border-mariana-rose text-white' 
                      : isActive 
                        ? 'border-mariana-rose text-mariana-rose' 
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-mariana-rose' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-mariana-rose' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {currentStep === 1 && (
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle>Datos Personales</CardTitle>
                <CardDescription>
                  Necesitamos algunos datos para confirmar tu reserva
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mariana-rose"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mariana-rose"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mariana-rose"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mariana-rose"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 text-mariana-rose focus:ring-mariana-rose border-gray-300 rounded"
                    checked={customerData.consent}
                    onChange={(e) => setCustomerData({...customerData, consent: e.target.checked})}
                  />
                  <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                    Acepto recibir comunicaciones sobre mi turno y promociones especiales
                  </label>
                </div>
                
                <Button 
                  onClick={handleNext}
                  className="mariana-button w-full"
                  disabled={!customerData.name || !customerData.email || !customerData.phone || !customerData.consent}
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle>Selecciona tu Servicio</CardTitle>
                <CardDescription>
                  Elige el tratamiento que más te guste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="unas" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="unas">Uñas</TabsTrigger>
                    <TabsTrigger value="pestanas">Pestañas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="unas" className="space-y-4">
                    {mockServices.filter(s => s.category === 'Uñas').map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedService === service.id ? 'ring-2 ring-mariana-rose' : ''
                        }`}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{service.name}</h3>
                              <p className="text-gray-600">{service.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration} min
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-mariana-rose">
                                {formatPrice(service.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Seña: {formatPrice(depositAmount)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="pestanas" className="space-y-4">
                    {mockServices.filter(s => s.category === 'Pestañas').map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedService === service.id ? 'ring-2 ring-mariana-rose' : ''
                        }`}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{service.name}</h3>
                              <p className="text-gray-600">{service.description}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {service.duration} min
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-mariana-rose">
                                {formatPrice(service.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Seña: {formatPrice(depositAmount)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle>Selecciona Fecha y Hora</CardTitle>
                <CardDescription>
                  Elige el día y horario que mejor te convenga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Calendario</h3>
                    {/* Aquí iría el componente de calendario */}
                    <div className="border border-gray-200 rounded-lg p-4 h-80 flex items-center justify-center bg-gray-50">
                      <p className="text-gray-500">Calendario interactivo</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Horarios Disponibles</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'].map((time) => (
                        <button
                          key={time}
                          className={`p-3 text-sm border rounded-md transition-colors ${
                            selectedTime === time
                              ? 'bg-mariana-rose text-white border-mariana-rose'
                              : 'border-gray-300 hover:border-mariana-rose'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {selectedTime && (
                      <Button 
                        onClick={handleNext}
                        className="mariana-button w-full mt-4"
                      >
                        Continuar
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && service && (
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle>Resumen y Pago</CardTitle>
                <CardDescription>
                  Revisa los detalles de tu reserva y procede con el pago
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Detalles de la Reserva</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Servicio:</span>
                      <span>{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span>{service.duration} minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fecha:</span>
                      <span>{selectedDate ? formatDate(selectedDate) : 'No seleccionada'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hora:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Precio total:</span>
                      <span>{formatPrice(service.price)}</span>
                    </div>
                    <div className="flex justify-between text-mariana-rose font-semibold">
                      <span>Seña a pagar:</span>
                      <span>{formatPrice(depositAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    El saldo restante se abona al finalizar el servicio
                  </p>
                  <Button 
                    onClick={handlePayment}
                    className="mariana-button text-lg px-8 py-4"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pagar con Mercado Pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 5 && (
            <Card className="mariana-card">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">¡Reserva Confirmada!</CardTitle>
                <CardDescription>
                  Tu turno ha sido reservado exitosamente
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  Te hemos enviado un email de confirmación con todos los detalles.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h3 className="font-semibold mb-2">Código de Reserva: #MR-2024-001</h3>
                  <p className="text-sm text-gray-600">
                    Guarda este código para futuras consultas
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="mariana-button">
                    <a href="/turnos/confirmado/MR-2024-001">
                      Ver Detalles
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/">
                      Volver al Inicio
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
