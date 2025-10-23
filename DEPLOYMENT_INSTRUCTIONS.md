# 🚀 Instrucciones de Despliegue - Mariana Rojas

## ⚠️ IMPORTANTE: Errores de Build Corregidos

Los errores de compilación en Vercel han sido corregidos. Necesitas hacer commit y push de los cambios para que Vercel use la versión actualizada.

## 📋 Pasos para Desplegar

### 1. Verificar Cambios Locales
```bash
git status
```

Deberías ver archivos modificados como:
- `package.json` (con las dependencias faltantes)
- `next.config.js` (sin la opción obsoleta)
- `README.md` (con instrucciones de Vercel)
- `vercel.json` (nuevo archivo de configuración)

### 2. Agregar Todos los Cambios
```bash
git add .
```

### 3. Hacer Commit
```bash
git commit -m "Fix build errors: Add missing dependencies and Vercel config

- Add @next-auth/prisma-adapter and bcryptjs dependencies
- Add @types/bcryptjs for TypeScript support
- Add react-day-picker for calendar component
- Remove obsolete appDir option from next.config.js
- Add vercel.json configuration
- Update README with Vercel deployment instructions"
```

### 4. Hacer Push
```bash
git push origin main
```

### 5. Verificar en Vercel
- Ve a tu dashboard de Vercel
- El nuevo deployment debería iniciarse automáticamente
- El build ahora debería ser exitoso

## 🔧 Cambios Realizados

### Dependencias Agregadas
```json
{
  "dependencies": {
    "@next-auth/prisma-adapter": "^1.0.7",
    "bcryptjs": "^2.4.3",
    "react-day-picker": "^8.10.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6"
  }
}
```

### Configuración Actualizada
- ✅ `next.config.js` - Eliminada opción obsoleta
- ✅ `vercel.json` - Configuración de despliegue
- ✅ `package.json` - Scripts y configuración de Prisma

## 🚨 Si el Build Sigue Fallando

### Verificar que el Commit se Subió
```bash
git log --oneline -5
```

Deberías ver el commit con el mensaje "Fix build errors..."

### Forzar Re-deployment en Vercel
1. Ve a tu proyecto en Vercel
2. Ve a la pestaña "Deployments"
3. Haz clic en "Redeploy" en el último deployment
4. O haz un pequeño cambio y push para triggerar un nuevo build

### Verificar Variables de Entorno
Asegúrate de que en Vercel tengas configuradas:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `MP_PUBLIC_KEY`
- `MP_ACCESS_TOKEN`
- `EMAIL_FROM`
- `RESEND_API_KEY`
- `SITE_URL`

## ✅ Una Vez que el Build Sea Exitoso

1. **Configurar Base de Datos:**
   - Crear una base de datos PostgreSQL en Vercel
   - O usar una externa (Railway, Supabase, etc.)

2. **Configurar Mercado Pago:**
   - Obtener credenciales de prueba
   - Configurar webhook: `https://tu-dominio.vercel.app/api/mercadopago/webhook`

3. **Configurar Email:**
   - Crear cuenta en Resend
   - Obtener API key
   - Agregar a variables de entorno

4. **Ejecutar Seed:**
   - Una vez que la base de datos esté configurada
   - Ejecutar el seed para crear datos iniciales

## 🎉 Resultado Final

Una vez completados todos los pasos, tendrás:
- ✅ Web funcionando en Vercel
- ✅ Sistema de reservas operativo
- ✅ Integración con Mercado Pago
- ✅ Emails automáticos
- ✅ Panel de administración
- ✅ Base de datos configurada

¡La web de Mariana Rojas estará lista para recibir reservas! 💅✨

