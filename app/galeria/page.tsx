import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Instagram, Heart } from 'lucide-react'
import Link from 'next/link'

// Galería de imágenes (en producción vendrían de una API o CMS)
const galleryImages = [
  {
    id: '1',
    src: '/gallery/unas-1.jpg',
    alt: 'Manicura clásica',
    category: 'Uñas',
    description: 'Manicura clásica con esmaltado rojo',
  },
  {
    id: '2',
    src: '/gallery/unas-2.jpg',
    alt: 'Nail art',
    category: 'Uñas',
    description: 'Nail art con diseño floral',
  },
  {
    id: '3',
    src: '/gallery/unas-3.jpg',
    alt: 'Esmaltado francés',
    category: 'Uñas',
    description: 'Esmaltado francés elegante',
  },
  {
    id: '4',
    src: '/gallery/pestanas-1.jpg',
    alt: 'Extensiones clásicas',
    category: 'Pestañas',
    description: 'Extensiones clásicas naturales',
  },
  {
    id: '5',
    src: '/gallery/pestanas-2.jpg',
    alt: 'Extensiones híbridas',
    category: 'Pestañas',
    description: 'Extensiones híbridas con volumen',
  },
  {
    id: '6',
    src: '/gallery/pestanas-3.jpg',
    alt: 'Lifting de pestañas',
    category: 'Pestañas',
    description: 'Lifting de pestañas natural',
  },
  {
    id: '7',
    src: '/gallery/combo-1.jpg',
    alt: 'Combo completo',
    category: 'Combo',
    description: 'Uñas y pestañas combinadas',
  },
  {
    id: '8',
    src: '/gallery/combo-2.jpg',
    alt: 'Look completo',
    category: 'Combo',
    description: 'Look completo para ocasión especial',
  },
]

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Nuestra Galería
          </h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Descubre algunos de nuestros trabajos más hermosos y encuentra inspiración para tu próximo look
          </p>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image) => (
              <Card key={image.id} className="mariana-card group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  {/* Placeholder para imagen */}
                  <div className="w-full h-full bg-gradient-to-br from-mariana-pink/20 to-mariana-rose/20 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-mariana-rose/50" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mariana-rose">
                      {image.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      #{image.id}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {image.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16 bg-gradient-to-br from-mariana-pink/10 to-mariana-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Instagram className="h-16 w-16 text-mariana-rose mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Síguenos en Instagram
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Mantente al día con nuestros últimos trabajos y encuentra inspiración para tu próximo look
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="mariana-button">
                <a 
                  href="https://instagram.com/marianarojas_nails" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  @marianarojas_nails
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/turnos">
                  Reservar Turno
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-mariana-rose to-mariana-pink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Te gustó lo que viste?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Reserva tu turno y deja que creemos algo hermoso para ti
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-mariana-rose hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/turnos">
                Reservar Ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
