import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Star, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

// Datos de servicios (en producción vendrían de la base de datos)
const services = {
  unas: [
    {
      id: '1',
      name: 'Manicura Clásica',
      description: 'Corte, limado, cutículas y esmaltado tradicional',
      duration: 45,
      price: 2500,
      features: ['Corte y limado', 'Tratamiento de cutículas', 'Esmaltado tradicional', 'Hidratación'],
      popular: false,
    },
    {
      id: '2',
      name: 'Manicura Semipermanente',
      description: 'Esmaltado de larga duración con gel',
      duration: 60,
      price: 3500,
      features: ['Preparación de uñas', 'Esmaltado semipermanente', 'Secado con lámpara LED', 'Duración 2-3 semanas'],
      popular: true,
    },
    {
      id: '3',
      name: 'Esmaltado Francés',
      description: 'Clásico esmaltado francés con acabado perfecto',
      duration: 60,
      price: 3000,
      features: ['Base transparente', 'Punta blanca', 'Top coat brillante', 'Acabado profesional'],
      popular: false,
    },
    {
      id: '4',
      name: 'Nail Art Básico',
      description: 'Diseños simples y elegantes en tus uñas',
      duration: 75,
      price: 4000,
      features: ['Diseño personalizado', 'Colores a elección', 'Detalles decorativos', 'Acabado profesional'],
      popular: false,
    },
  ],
  pestanas: [
    {
      id: '5',
      name: 'Extensiones Clásicas',
      description: 'Pestañas naturales con volumen clásico',
      duration: 90,
      price: 4500,
      features: ['Pestaña por pestaña', 'Volumen clásico', 'Material premium', 'Duración 3-4 semanas'],
      popular: true,
    },
    {
      id: '6',
      name: 'Extensiones Híbridas',
      description: 'Combinación de clásicas y volumen para mayor impacto',
      duration: 120,
      price: 5500,
      features: ['Técnica híbrida', 'Mayor volumen', 'Efecto dramático', 'Duración 3-4 semanas'],
      popular: false,
    },
    {
      id: '7',
      name: 'Lifting de Pestañas',
      description: 'Curvatura natural de tus pestañas',
      duration: 60,
      price: 3000,
      features: ['Curvatura natural', 'Tinte incluido', 'Efecto inmediato', 'Duración 6-8 semanas'],
      popular: false,
    },
    {
      id: '8',
      name: 'Tinte de Pestañas',
      description: 'Tinte para realzar el color natural',
      duration: 30,
      price: 1500,
      features: ['Tinte profesional', 'Color natural', 'Efecto inmediato', 'Duración 4-6 semanas'],
      popular: false,
    },
  ],
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Nuestros Servicios
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Descubre todos nuestros tratamientos de uñas y pestañas diseñados para realzar tu belleza natural
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="unas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12">
              <TabsTrigger value="unas" className="text-lg py-3">
                <Sparkles className="h-5 w-5 mr-2" />
                Uñas
              </TabsTrigger>
              <TabsTrigger value="pestanas" className="text-lg py-3">
                <Star className="h-5 w-5 mr-2" />
                Pestañas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unas" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {services.unas.map((service) => (
                  <Card key={service.id} className="mariana-card group hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {service.description}
                          </CardDescription>
                        </div>
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-mariana-rose to-mariana-pink text-white">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {service.duration} min
                          </div>
                          <div className="text-2xl font-bold text-mariana-rose">
                            {formatPrice(service.price)}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Incluye:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <Heart className="h-3 w-3 text-mariana-rose mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button asChild className="mariana-button w-full mt-6">
                          <Link href={`/turnos?service=${service.id}`}>
                            Reservar Turno
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pestanas" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {services.pestanas.map((service) => (
                  <Card key={service.id} className="mariana-card group hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {service.description}
                          </CardDescription>
                        </div>
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-mariana-rose to-mariana-pink text-white">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {service.duration} min
                          </div>
                          <div className="text-2xl font-bold text-mariana-rose">
                            {formatPrice(service.price)}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Incluye:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <Heart className="h-3 w-3 text-mariana-rose mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button asChild className="mariana-button w-full mt-6">
                          <Link href={`/turnos?service=${service.id}`}>
                            Reservar Turno
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Tienes dudas sobre algún servicio?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Contáctanos y te asesoramos sobre el tratamiento perfecto para ti
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-mariana-rose hover:bg-gray-100">
              <Link href="/contacto">
                Contactar
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-mariana-rose">
              <Link href="/turnos">
                Reservar Turno
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

