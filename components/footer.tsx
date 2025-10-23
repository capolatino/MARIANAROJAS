import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-mariana-cream to-mariana-pink/10 border-t border-mariana-pink/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {siteConfig.business.name}
            </h3>
            <p className="text-sm text-gray-600">
              Especialistas en uñas y pestañas. Reserva tu turno online.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <a href={`tel:${siteConfig.business.phone}`}>
                  {siteConfig.business.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${siteConfig.business.email}`}>
                  {siteConfig.business.email}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{siteConfig.business.address}</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Horarios</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Lun - Vie: 9:00 - 18:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Sáb: 9:00 - 16:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Dom: Cerrado</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Enlaces</h3>
            <div className="space-y-2">
              <Link href="/servicios" className="block text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Servicios
              </Link>
              <Link href="/precios" className="block text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Precios
              </Link>
              <Link href="/galeria" className="block text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Galería
              </Link>
              <Link href="/turnos" className="block text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Reservar Turno
              </Link>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Síguenos</h3>
            <div className="space-y-2">
              <a
                href={`https://instagram.com/${siteConfig.business.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-mariana-rose transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>{siteConfig.business.instagram}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-mariana-rose transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-mariana-pink/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} {siteConfig.business.name}. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link href="/politicas" className="text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Políticas de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-gray-600 hover:text-mariana-rose transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
