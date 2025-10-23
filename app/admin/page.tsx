'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalBookings: number
  confirmedBookings: number
  pendingBookings: number
  totalRevenue: number
  todayBookings: number
  upcomingBookings: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    // Simular carga de estadísticas
    const mockStats: DashboardStats = {
      totalBookings: 156,
      confirmedBookings: 142,
      pendingBookings: 14,
      totalRevenue: 245000,
      todayBookings: 8,
      upcomingBookings: 23
    }

    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [session, status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mariana-rose mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mariana-cream to-white">
      {/* Header */}
      <div className="bg-white border-b border-mariana-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {session.user?.email}</p>
            </div>
            <div className="flex space-x-4">
              <Button asChild variant="outline">
                <Link href="/">
                  Ver Sitio Web
                </Link>
              </Button>
              <Button asChild className="mariana-button">
                <Link href="/admin/turnos">
                  Gestionar Turnos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="mariana-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-mariana-rose/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-mariana-rose" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Turnos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalBookings || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mariana-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.confirmedBookings || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mariana-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.pendingBookings || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mariana-card">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-mariana-rose/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-mariana-rose" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ingresos</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats?.totalRevenue?.toLocaleString('es-AR') || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen del día */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="mariana-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-mariana-rose mr-2" />
                Turnos de Hoy
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-mariana-rose mb-2">
                  {stats?.todayBookings || 0}
                </div>
                <p className="text-gray-600">turnos programados</p>
                <Button asChild className="mariana-button mt-4">
                  <Link href="/admin/calendario">
                    Ver Calendario
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mariana-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-mariana-rose mr-2" />
                Próximos Turnos
              </CardTitle>
              <CardDescription>
                Turnos confirmados para los próximos días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-mariana-rose mb-2">
                  {stats?.upcomingBookings || 0}
                </div>
                <p className="text-gray-600">turnos próximos</p>
                <Button asChild className="mariana-button mt-4">
                  <Link href="/admin/turnos">
                    Gestionar Turnos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="mariana-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-mariana-rose mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Calendario</h3>
              <p className="text-sm text-gray-600 mb-4">Ver y gestionar turnos</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/calendario">Ver</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mariana-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-mariana-rose mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Clientes</h3>
              <p className="text-sm text-gray-600 mb-4">Gestionar base de clientes</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/clientes">Ver</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mariana-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-mariana-rose mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Servicios</h3>
              <p className="text-sm text-gray-600 mb-4">Configurar servicios</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/servicios">Ver</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="mariana-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-mariana-rose mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Ajustes</h3>
              <p className="text-sm text-gray-600 mb-4">Configuración general</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/ajustes">Ver</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

