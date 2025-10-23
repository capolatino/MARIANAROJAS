import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  Sparkles, 
  Star, 
  Users, 
  Clock, 
  Shield,
  Heart,
  ArrowRight
} from 'lucide-react'
import { siteConfig } from '@/lib/site'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mariana-cream via-mariana-pink/20 to-mariana-rose/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="mariana-text-gradient">
                {siteConfig.business.name}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Especialistas en uñas y pestañas. Reserva tu turno online y disfruta 
              de un servicio de calidad con la mejor atención personalizada.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="mariana-button text-lg px-8 py-4">
                <Link href="/turnos">
                  <Calendar className="h-5 w-5 mr-2" />
                  Reservar Turno
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/servicios">
                  Ver Servicios
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Cuidamos cada detalle para que te sientas única
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {/* Uñas */}
            <Card className="mariana-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-mariana-rose to-mariana-pink flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Uñas</h3>
                    <p className="text-gray-600">Manicura y nail art</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Manicura clásica y semipermanente
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Esmaltado francés
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Nail art personalizado
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="mariana-button w-full">
                    <Link href="/servicios#unas">
                      Ver Detalles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pestañas */}
            <Card className="mariana-card group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-mariana-beige to-mariana-accent flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pestañas</h3>
                    <p className="text-gray-600">Extensiones y tratamientos</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Extensiones clásicas e híbridas
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Lifting de pestañas
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-mariana-rose mr-3" />
                    Tinte y perfilado
                  </li>
                </ul>
                <div className="mt-6">
                  <Button asChild className="mariana-button w-full">
                    <Link href="/servicios#pestanas">
                      Ver Detalles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-24 bg-gradient-to-br from-mariana-cream to-mariana-pink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Calidad, profesionalismo y atención personalizada
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-mariana-rose to-mariana-pink flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Atención Personalizada</h3>
              <p className="mt-2 text-gray-600">
                Cada cliente es único. Nos adaptamos a tus necesidades y preferencias.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-mariana-beige to-mariana-accent flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Productos de Calidad</h3>
              <p className="mt-2 text-gray-600">
                Utilizamos solo productos premium y técnicas profesionales.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-mariana-rose to-mariana-pink flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Reserva Online</h3>
              <p className="mt-2 text-gray-600">
                Reserva tu turno las 24hs del día de forma rápida y segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Lista para lucir increíble?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Reserva tu turno ahora y disfruta de nuestros servicios de calidad
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-mariana-rose hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/turnos">
                <Calendar className="h-5 w-5 mr-2" />
                Reservar Ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

