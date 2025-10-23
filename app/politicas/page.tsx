import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { ArrowLeft, Shield, Clock, CreditCard, Phone } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '../../lib/site'

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Políticas y Términos
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Conoce nuestras políticas para una mejor experiencia de servicio
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            {/* Política de Cancelaciones */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 text-mariana-rose mr-3" />
                  Política de Cancelaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancelaciones</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Las cancelaciones deben realizarse con al menos 24 horas de anticipación</li>
                    <li>En caso de cancelación oportuna, se reembolsará el 100% de la seña abonada</li>
                    <li>Cancelaciones con menos de 24 horas de anticipación: se retendrá el 50% de la seña</li>
                    <li>No presentarse al turno sin aviso previo: se perderá el 100% de la seña</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Reagendos</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Los reagendos pueden realizarse hasta 24 horas antes del turno sin costo adicional</li>
                    <li>Reagendos con menos de 24 horas: se aplicará un cargo del 20% del valor del servicio</li>
                    <li>Los reagendos están sujetos a disponibilidad</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Política de Pagos */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 text-mariana-rose mr-3" />
                  Política de Pagos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Seña Requerida</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Se requiere abonar una seña del 30% del valor total del servicio para confirmar el turno</li>
                    <li>La seña debe abonarse al momento de realizar la reserva</li>
                    <li>El saldo restante se abona al finalizar el servicio</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Métodos de Pago</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Efectivo (pesos argentinos)</li>
                    <li>Tarjetas de débito y crédito (Visa, Mastercard, American Express)</li>
                    <li>Transferencia bancaria</li>
                    <li>Mercado Pago</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Reembolsos</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Los reembolsos se procesan en un plazo de 5 a 10 días hábiles</li>
                    <li>El reembolso se realizará por el mismo método de pago utilizado</li>
                    <li>En caso de cancelación por parte del establecimiento, se reembolsará el 100% del pago</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Política de Privacidad */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 text-mariana-rose mr-3" />
                  Política de Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recopilación de Datos</h3>
                  <p className="text-gray-600 mb-4">
                    Recopilamos únicamente los datos necesarios para brindar nuestros servicios:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Nombre y apellido</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Información de contacto de emergencia (opcional)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Uso de la Información</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Confirmar y recordar citas</li>
                    <li>Enviar recordatorios y actualizaciones</li>
                    <li>Proporcionar información sobre nuestros servicios</li>
                    <li>Mejorar la calidad de nuestro servicio</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Protección de Datos</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>No compartimos información personal con terceros</li>
                    <li>Utilizamos medidas de seguridad para proteger sus datos</li>
                    <li>Puede solicitar la eliminación de sus datos en cualquier momento</li>
                    <li>Cumplimos con las leyes de protección de datos vigentes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Términos y Condiciones */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-6 w-6 text-mariana-rose mr-3" />
                  Términos y Condiciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Servicios</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Los servicios se brindan según las especificaciones acordadas</li>
                    <li>Los resultados pueden variar según las características individuales</li>
                    <li>Nos reservamos el derecho de rechazar servicios que consideremos inapropiados</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Responsabilidades del Cliente</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Llegar puntualmente a su cita</li>
                    <li>Informar sobre alergias o condiciones médicas relevantes</li>
                    <li>Seguir las instrucciones de cuidado post-tratamiento</li>
                    <li>Respetar las políticas del establecimiento</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Limitaciones de Responsabilidad</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>No nos hacemos responsables por reacciones alérgicas no informadas</li>
                    <li>Los daños por incumplimiento de instrucciones de cuidado no son responsabilidad nuestra</li>
                    <li>La duración de los tratamientos es estimativa y puede variar</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card className="mariana-card">
              <CardHeader>
                <CardTitle>¿Tienes preguntas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Si tienes alguna pregunta sobre nuestras políticas o necesitas aclarar algún punto, 
                  no dudes en contactarnos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="mariana-button">
                    <a href={`tel:${siteConfig.business.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`mailto:${siteConfig.business.email}`}>
                      Enviar Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

