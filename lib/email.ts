import nodemailer from 'nodemailer'
import { Resend } from 'resend'
import { emailTemplates } from './email-templates'

// Configuración de email
const getEmailProvider = () => {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY)
  }
  
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  
  throw new Error('No email provider configured')
}

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || 'reservas@marianarojas.com'
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  try {
    const provider = getEmailProvider()
    
    if (provider instanceof Resend) {
      const { data, error } = await provider.emails.send({
        from,
        to: [to],
        subject,
        html,
      })
      
      if (error) {
        throw new Error(`Resend error: ${error.message}`)
      }
      
      return { success: true, messageId: data?.id }
    } else {
      const info = await provider.sendMail({
        from,
        to,
        subject,
        html,
      })
      
      return { success: true, messageId: info.messageId }
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export async function sendConfirmationEmail(booking: any) {
  try {
    const template = emailTemplates.confirmation(booking)
    
    await sendEmail({
      to: booking.customer.email,
      subject: template.subject,
      html: template.html,
    })
    
    console.log(`Confirmation email sent to ${booking.customer.email}`)
    return { success: true }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}

export async function sendReminderEmail(booking: any) {
  try {
    const template = emailTemplates.reminder(booking)
    
    await sendEmail({
      to: booking.customer.email,
      subject: template.subject,
      html: template.html,
    })
    
    console.log(`Reminder email sent to ${booking.customer.email}`)
    return { success: true }
  } catch (error) {
    console.error('Error sending reminder email:', error)
    throw error
  }
}

// Función para generar archivo .ics
export function generateICS(booking: any): string {
  const startDate = new Date(booking.startsAt)
  const endDate = new Date(booking.endsAt)
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mariana Rojas//NONSGML v1.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}@marianarojas.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${booking.service.name} - Mariana Rojas`,
    `DESCRIPTION:Turno confirmado para ${booking.service.name}\\n\\nPrecio: $${booking.service.price.toLocaleString('es-AR')}\\nSeña: $${Math.round(booking.service.price * 0.3).toLocaleString('es-AR')}\\n\\nDirección: Av. Corrientes 1234, CABA\\nTeléfono: +54 9 11 1234-5678`,
    `LOCATION:Av. Corrientes 1234, CABA`,
    `ORGANIZER:CN=Mariana Rojas:mailto:hola@marianarojas.com`,
    `ATTENDEE:CN=${booking.customer.name}:mailto:${booking.customer.email}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio: Tu turno es en 1 hora',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  
  return ics
}

