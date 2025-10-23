import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../../lib/site'

export default function UbicacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ubicación y Contacto
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Encuéntranos fácilmente y contáctanos para cualquier consulta
          </p>
        </div>
      </section>

      {/* Información de contacto */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Estamos ubicados en el corazón de la ciudad, con fácil acceso en transporte público y estacionamiento disponible.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="mariana-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-mariana-rose mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Dirección
                        </h3>
                        <p className="text-gray-600">
                          {siteConfig.business.address}
                        </p>
                        <Button asChild variant="outline" className="mt-3">
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.business.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Ver en Google Maps
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mariana-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-mariana-rose mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Teléfono
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {siteConfig.business.phone}
                        </p>
                        <div className="flex space-x-3">
                          <Button asChild size="sm" className="mariana-button">
                            <a href={`tel:${siteConfig.business.phone}`}>
                              Llamar
                            </a>
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <a href={`https://wa.me/${siteConfig.business.whatsapp}`} target="_blank" rel="noopener noreferrer">
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mariana-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-mariana-rose mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Email
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {siteConfig.business.email}
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <a href={`mailto:${siteConfig.business.email}`}>
                            Enviar Email
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mariana-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-mariana-rose mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Horarios de Atención
                        </h3>
                        <div className="space-y-1 text-gray-600">
                          <p>Lunes - Viernes: 9:00 - 18:00</p>
                          <p>Sábados: 9:00 - 16:00</p>
                          <p>Domingos: Cerrado</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Cómo Llegar
              </h3>
              
              {/* Mapa placeholder */}
              <Card className="mariana-card">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-mariana-pink/20 to-mariana-rose/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-mariana-rose/50 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Mapa interactivo de Google Maps
                      </p>
                      <Button asChild className="mariana-button mt-4">
                        <a 
                          href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.business.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Abrir en Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instrucciones */}
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Instrucciones de Llegada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Estamos ubicados en Av. Corrientes, entre las calles Callao y Pasteur</p>
                    <p>• Estación de subte más cercana: Callao (Línea B)</p>
                    <p>• Líneas de colectivo: 12, 24, 26, 29, 39, 60, 68, 99</p>
                    <p>• Estacionamiento disponible en la zona</p>
                    <p>• Acceso para personas con movilidad reducida</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            No dudes en contactarnos, estaremos encantadas de ayudarte
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-mariana-rose hover:bg-gray-100">
              <a href={`tel:${siteConfig.business.phone}`}>
                <Phone className="h-5 w-5 mr-2" />
                Llamar Ahora
              </a>
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

