import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Clock, Star, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const pricingPlans = [
  {
    name: 'Uñas Básico',
    description: 'Perfecto para el día a día',
    price: 2500,
    duration: '45 min',
    features: [
      'Manicura clásica',
      'Corte y limado',
      'Tratamiento de cutículas',
      'Esmaltado tradicional',
      'Hidratación de manos',
    ],
    popular: false,
    services: ['Manicura Clásica'],
  },
  {
    name: 'Uñas Premium',
    description: 'Para ocasiones especiales',
    price: 3500,
    duration: '60 min',
    features: [
      'Manicura semipermanente',
      'Preparación profesional',
      'Esmaltado de larga duración',
      'Secado con lámpara LED',
      'Duración 2-3 semanas',
      'Esmaltado francés incluido',
    ],
    popular: true,
    services: ['Manicura Semipermanente', 'Esmaltado Francés'],
  },
  {
    name: 'Uñas Art',
    description: 'Para las más creativas',
    price: 4000,
    duration: '75 min',
    features: [
      'Nail art personalizado',
      'Diseños únicos',
      'Colores a elección',
      'Detalles decorativos',
      'Acabado profesional',
      'Fotos para redes sociales',
    ],
    popular: false,
    services: ['Nail Art Básico'],
  },
]

const pestanasPlans = [
  {
    name: 'Pestañas Natural',
    description: 'Para un look natural y elegante',
    price: 3000,
    duration: '60 min',
    features: [
      'Lifting de pestañas',
      'Tinte incluido',
      'Efecto inmediato',
      'Duración 6-8 semanas',
      'Mantenimiento mínimo',
    ],
    popular: false,
    services: ['Lifting de Pestañas'],
  },
  {
    name: 'Pestañas Clásicas',
    description: 'Volumen perfecto para el día a día',
    price: 4500,
    duration: '90 min',
    features: [
      'Extensiones clásicas',
      'Pestaña por pestaña',
      'Material premium',
      'Duración 3-4 semanas',
      'Retoque incluido',
    ],
    popular: true,
    services: ['Extensiones Clásicas'],
  },
  {
    name: 'Pestañas Dramáticas',
    description: 'Para un look impactante',
    price: 5500,
    duration: '120 min',
    features: [
      'Extensiones híbridas',
      'Mayor volumen',
      'Efecto dramático',
      'Duración 3-4 semanas',
      'Retoque incluido',
      'Tinte opcional',
    ],
    popular: false,
    services: ['Extensiones Híbridas'],
  },
]

const addOns = [
  {
    name: 'Tinte de Pestañas',
    price: 1500,
    duration: '30 min',
    description: 'Realza el color natural de tus pestañas',
  },
  {
    name: 'Perfilado de Cejas',
    price: 2000,
    duration: '30 min',
    description: 'Diseño perfecto para tu rostro',
  },
  {
    name: 'Hidratación Facial',
    price: 2500,
    duration: '45 min',
    description: 'Tratamiento hidratante para tu piel',
  },
]

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Precios y Paquetes
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Encuentra el paquete perfecto para ti. Todos incluyen productos de calidad y atención profesional.
          </p>
        </div>
      </section>

      {/* Uñas */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <Sparkles className="h-8 w-8 inline-block mr-3 text-mariana-rose" />
              Paquetes de Uñas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Elige el nivel de cuidado perfecto para tus uñas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`mariana-card group hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-mariana-rose scale-105' : ''
              }`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center">
                    {plan.popular && (
                      <Badge className="bg-gradient-to-r from-mariana-rose to-mariana-pink text-white mb-4">
                        Más Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-mariana-rose">
                      {formatPrice(plan.price)}
                    </div>
                    <div className="flex items-center justify-center text-gray-600 mt-2">
                      <Clock className="h-4 w-4 mr-2" />
                      {plan.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-mariana-rose mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mariana-button w-full mt-8">
                    <Link href={`/turnos?service=${plan.services[0]}`}>
                      Reservar Ahora
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pestañas */}
      <section className="py-16 bg-gradient-to-br from-mariana-pink/10 to-mariana-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <Star className="h-8 w-8 inline-block mr-3 text-mariana-rose" />
              Paquetes de Pestañas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Realza tu mirada con nuestros tratamientos especializados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pestanasPlans.map((plan) => (
              <Card key={plan.name} className={`mariana-card group hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-mariana-rose scale-105' : ''
              }`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center">
                    {plan.popular && (
                      <Badge className="bg-gradient-to-r from-mariana-rose to-mariana-pink text-white mb-4">
                        Más Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-mariana-rose">
                      {formatPrice(plan.price)}
                    </div>
                    <div className="flex items-center justify-center text-gray-600 mt-2">
                      <Clock className="h-4 w-4 mr-2" />
                      {plan.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-mariana-rose mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mariana-button w-full mt-8">
                    <Link href={`/turnos?service=${plan.services[0]}`}>
                      Reservar Ahora
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Servicios Adicionales
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Complementa tu tratamiento principal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <Card key={addon.name} className="mariana-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {addon.description}
                    </p>
                    <div className="text-2xl font-bold text-mariana-rose mb-2">
                      {formatPrice(addon.price)}
                    </div>
                    <div className="flex items-center justify-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {addon.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Información Importante
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Seña Requerida</h3>
                <p className="text-white/90">
                  Se requiere abonar una seña del 30% para confirmar el turno
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cancelaciones</h3>
                <p className="text-white/90">
                  Las cancelaciones deben realizarse con 24hs de anticipación
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Reagendos</h3>
                <p className="text-white/90">
                  Los turnos pueden reagendarse hasta 24hs antes sin costo
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-mariana-rose hover:bg-gray-100">
                <Link href="/turnos">
                  Reservar Mi Turno
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

