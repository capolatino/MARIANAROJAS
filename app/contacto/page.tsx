import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contactanos
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? ¿Quieres saber más sobre nuestros servicios? 
            Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                <p className="text-gray-600">
                  Completa el formulario y te responderemos a la brevedad
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre *</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        className="mt-1"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apellido">Apellido *</Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        type="text"
                        required
                        className="mt-1"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      className="mt-1"
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>

                  <div>
                    <Label htmlFor="asunto">Asunto *</Label>
                    <Input
                      id="asunto"
                      name="asunto"
                      type="text"
                      required
                      className="mt-1"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje *</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      rows={4}
                      className="mt-1"
                      placeholder="Cuéntanos más detalles..."
                    />
                  </div>

                  <Button type="submit" className="mariana-button w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Información de contacto */}
            <div className="space-y-6">
              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-mariana-rose mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Teléfono</h3>
                      <p className="text-gray-600">{siteConfig.business.phone}</p>
                      <Button asChild size="sm" variant="outline" className="mt-2">
                        <a href={`tel:${siteConfig.business.phone}`}>
                          Llamar
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-mariana-rose mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">{siteConfig.business.email}</p>
                      <Button asChild size="sm" variant="outline" className="mt-2">
                        <a href={`mailto:${siteConfig.business.email}`}>
                          Enviar Email
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-mariana-rose mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Horarios</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Lun - Vie: 9:00 - 18:00</p>
                        <p>Sáb: 9:00 - 16:00</p>
                        <p>Dom: Cerrado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Respuesta Rápida</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Para una respuesta más rápida, también puedes contactarnos por:
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full justify-start">
                      <a 
                        href={`https://wa.me/${siteConfig.business.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a 
                        href={`https://instagram.com/${siteConfig.business.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mariana-card">
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900">¿Cuánto dura un turno?</h4>
                      <p className="text-gray-600">Depende del servicio, desde 30 minutos hasta 2 horas.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">¿Puedo cancelar mi turno?</h4>
                      <p className="text-gray-600">Sí, con 24hs de anticipación sin costo.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">¿Qué métodos de pago aceptan?</h4>
                      <p className="text-gray-600">Efectivo, tarjeta y transferencia bancaria.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
