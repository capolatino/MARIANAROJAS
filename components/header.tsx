'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Calendar, Phone, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Precios', href: '/precios' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Reservar', href: '/turnos' },
  { name: 'Ubicación', href: '/ubicacion' },
  { name: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-mariana-pink/20 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mariana-rose to-mariana-pink flex items-center justify-center">
                <span className="text-white font-bold text-sm">MR</span>
              </div>
              <span className="text-2xl font-bold mariana-text-gradient">
                {siteConfig.business.name}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-mariana-rose',
                  pathname === item.href
                    ? 'text-mariana-rose'
                    : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button asChild className="mariana-button">
              <Link href="/turnos">
                <Calendar className="h-4 w-4 mr-2" />
                Reservar Turno
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-mariana-rose"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 text-base font-medium transition-colors hover:text-mariana-rose',
                    pathname === item.href
                      ? 'text-mariana-rose'
                      : 'text-gray-700'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button asChild className="mariana-button w-full">
                  <Link href="/turnos">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reservar Turno
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
