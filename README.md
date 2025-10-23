# Mariana Rojas - Sistema de Reservas

Sistema completo de reservas online para salón de uñas y pestañas con integración de pagos, emails y panel de administración.

## 🚀 Características

- **Reserva Online**: Sistema completo de reserva de turnos con calendario interactivo
- **Pagos**: Integración con Mercado Pago Checkout Pro
- **Emails**: Confirmaciones automáticas y recordatorios
- **Panel Admin**: Gestión completa de turnos, clientes y servicios
- **Responsive**: Diseño adaptativo para móviles y desktop
- **Seguro**: Autenticación y validación de datos

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Base de Datos**: Prisma ORM + PostgreSQL/SQLite
- **Autenticación**: NextAuth.js
- **Pagos**: Mercado Pago Checkout Pro
- **Emails**: Nodemailer/Resend
- **Validación**: Zod + react-hook-form
- **Animaciones**: Framer Motion

## 📋 Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- PostgreSQL (opcional, se puede usar SQLite para desarrollo)

## ⚡ Instalación Rápida

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd mariana-rojas-web
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env.local
```

4. **Configurar base de datos**
```bash
# Para SQLite (desarrollo)
pnpm prisma db push

# Para PostgreSQL (producción)
# Configurar DATABASE_URL en .env.local
pnpm prisma db push
```

5. **Ejecutar seed inicial**
```bash
pnpm prisma db seed
```

6. **Iniciar servidor de desarrollo**
```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

## 🔧 Configuración Detallada

### Variables de Entorno

Copia `env.example` a `.env.local` y configura las siguientes variables:

```env
# Base de datos
DATABASE_URL="postgresql://user:pass@host:5432/marianarojas"
# Para desarrollo local con SQLite:
# DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="tu-secret-super-seguro-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Admin
ADMIN_EMAIL="admin@marianarojas.com"
ADMIN_PASSWORD="cambiar123"

# Mercado Pago
MP_PUBLIC_KEY="TEST-tu-public-key-aqui"
MP_ACCESS_TOKEN="TEST-tu-access-token-aqui"

# Email
EMAIL_FROM="reservas@marianarojas.com"
# Opción 1: SMTP
SMTP_HOST="smtp.tu-dominio.com"
SMTP_PORT=587
SMTP_USER="reservas@marianarojas.com"
SMTP_PASS="tu-password-smtp"
# Opción 2: Resend (recomendado)
RESEND_API_KEY="re_tu-api-key-aqui"

# Sitio
SITE_URL="http://localhost:3000"
```

### Configuración de Mercado Pago

1. **Crear cuenta en Mercado Pago**
   - Ir a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
   - Crear una aplicación
   - Obtener las credenciales de prueba

2. **Configurar webhook**
   - URL del webhook: `https://tu-dominio.com/api/mercadopago/webhook`
   - Eventos: `payment`
   - Método: `POST`

3. **Credenciales de prueba**
   ```env
   MP_PUBLIC_KEY="TEST-tu-public-key"
   MP_ACCESS_TOKEN="TEST-tu-access-token"
   ```

### Configuración de Email

#### Opción 1: Resend (Recomendado)
1. Crear cuenta en [Resend](https://resend.com)
2. Obtener API key
3. Configurar dominio
4. Agregar `RESEND_API_KEY` al `.env.local`

#### Opción 2: SMTP
1. Configurar servidor SMTP
2. Agregar credenciales al `.env.local`

### Configuración de Base de Datos

#### SQLite (Desarrollo)
```env
DATABASE_URL="file:./dev.db"
```

#### PostgreSQL (Producción)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/marianarojas"
```

## 📱 Páginas y Funcionalidades

### Páginas Públicas
- **/** - Home con CTA de reserva
- **/servicios** - Catálogo de servicios (uñas/pestañas)
- **/precios** - Paquetes y precios
- **/galeria** - Galería de trabajos
- **/turnos** - Flujo de reserva completo
- **/ubicacion** - Información de contacto y ubicación
- **/contacto** - Formulario de contacto
- **/politicas** - Políticas y términos

### Panel de Administración
- **/admin/login** - Login de administrador
- **/admin** - Dashboard principal
- **/admin/calendario** - Vista de calendario
- **/admin/turnos** - Gestión de turnos
- **/admin/clientes** - Base de clientes
- **/admin/servicios** - Gestión de servicios
- **/admin/ajustes** - Configuración general

## 🔄 Flujo de Reserva

1. **Datos Personales**: Cliente ingresa nombre, email, teléfono
2. **Selección de Servicio**: Elige entre uñas o pestañas
3. **Fecha y Hora**: Selecciona día y horario disponible
4. **Pago de Seña**: Pago del 30% con Mercado Pago
5. **Confirmación**: Email automático con detalles

## 🎨 Personalización

### Colores
Los colores se pueden modificar en `tailwind.config.js`:

```javascript
colors: {
  mariana: {
    cream: "#F9F5F3",
    pink: "#F6C5D9", 
    beige: "#D7B89C",
    rose: "#F6A6C1",
  }
}
```

### Textos y Configuración
Modifica `lib/site.ts` para cambiar:
- Información del negocio
- Horarios de atención
- Políticas
- Contacto

### Servicios
Los servicios se gestionan desde el panel admin o directamente en la base de datos.

## 📊 Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Construcción
pnpm build

# Inicio en producción
pnpm start

# Base de datos
pnpm prisma db push      # Aplicar cambios al schema
pnpm prisma db seed      # Ejecutar seed inicial
pnpm prisma studio       # Abrir Prisma Studio

# Linting
pnpm lint
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otras Plataformas
- **Railway**: Para base de datos PostgreSQL
- **Netlify**: Para hosting estático
- **DigitalOcean**: Para VPS completo

## 🔒 Seguridad

- Validación de datos con Zod
- Sanitización de inputs
- Autenticación con NextAuth
- Protección de rutas admin
- Webhooks seguros de Mercado Pago

## 📈 Monitoreo

- Logs de errores en consola
- Webhooks de Mercado Pago
- Emails de confirmación
- Panel de administración

## 🛠️ Mantenimiento

### Backup de Base de Datos
```bash
# PostgreSQL
pg_dump marianarojas > backup.sql

# SQLite
cp dev.db backup.db
```

### Actualizaciones
```bash
pnpm update
pnpm prisma db push
```

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@marianarojas.com
- Documentación: [Enlace a docs]
- Issues: [GitHub Issues]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Desarrollado con ❤️ para Mariana Rojas**
