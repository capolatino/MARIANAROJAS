export const emailTemplates = {
  confirmation: (booking: any) => ({
    subject: `✅ Turno Confirmado - ${booking.service.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Turno Confirmado</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9f5f3; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #F6A6C1 0%, #F6C5D9 50%, #D7B89C 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 40px 20px; }
          .booking-details { background-color: #f9f5f3; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .detail-label { font-weight: 600; color: #666; }
          .detail-value { color: #333; }
          .highlight { color: #F6A6C1; font-weight: bold; }
          .button { display: inline-block; background: linear-gradient(135deg, #F6A6C1, #F6C5D9); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 5px; }
          .footer { background-color: #f9f5f3; padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .policy { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Mariana Rojas</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Uñas y Pestañas</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">¡Tu turno está confirmado! 🎉</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Hola <strong>${booking.customer.name}</strong>,<br><br>
              Tu reserva ha sido confirmada exitosamente. Te esperamos para brindarte el mejor servicio.
            </p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #333;">Detalles de tu Turno</h3>
              <div class="detail-row">
                <span class="detail-label">Servicio:</span>
                <span class="detail-value highlight">${booking.service.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fecha:</span>
                <span class="detail-value">${new Date(booking.startsAt).toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Hora:</span>
                <span class="detail-value">${new Date(booking.startsAt).toLocaleTimeString('es-AR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duración:</span>
                <span class="detail-value">${booking.service.durationMin} minutos</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Precio Total:</span>
                <span class="detail-value highlight">$${booking.service.price.toLocaleString('es-AR')}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Seña Pagada:</span>
                <span class="detail-value highlight">$${Math.round(booking.service.price * 0.3).toLocaleString('es-AR')}</span>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.SITE_URL}/turnos/confirmado/${booking.id}" class="button">
                Ver Detalles Completos
              </a>
              <a href="https://maps.google.com/?q=Av.+Corrientes+1234,+CABA" class="button" style="background: linear-gradient(135deg, #D7B89C, #F6A6C1);">
                Ver Ubicación
              </a>
            </div>
            
            <div class="policy">
              <h4 style="margin-top: 0; color: #856404;">📋 Información Importante</h4>
              <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
                <li>Llega 10 minutos antes de tu turno</li>
                <li>Trae una identificación válida</li>
                <li>El saldo restante se abona al finalizar el servicio</li>
                <li>Para cancelar, hazlo con 24hs de anticipación</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Si tienes alguna pregunta, no dudes en contactarnos.<br>
              ¡Esperamos verte pronto! 💅✨
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Mariana Rojas</strong> - Uñas y Pestañas</p>
            <p>📞 +54 9 11 1234-5678 | 📧 hola@marianarojas.com</p>
            <p>📍 Av. Corrientes 1234, CABA</p>
            <p>Instagram: @marianarojas_nails</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  reminder: (booking: any) => ({
    subject: `⏰ Recordatorio - Tu turno es mañana`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recordatorio de Turno</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9f5f3; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #F6A6C1 0%, #F6C5D9 50%, #D7B89C 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 40px 20px; }
          .booking-details { background-color: #f9f5f3; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .detail-label { font-weight: 600; color: #666; }
          .detail-value { color: #333; }
          .highlight { color: #F6A6C1; font-weight: bold; }
          .button { display: inline-block; background: linear-gradient(135deg, #F6A6C1, #F6C5D9); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 5px; }
          .footer { background-color: #f9f5f3; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Recordatorio</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Tu turno es mañana</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333; margin-bottom: 20px;">¡No olvides tu cita! 💅</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Hola <strong>${booking.customer.name}</strong>,<br><br>
              Te recordamos que tienes un turno mañana. ¡Te esperamos!
            </p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #333;">Detalles de tu Turno</h3>
              <div class="detail-row">
                <span class="detail-label">Servicio:</span>
                <span class="detail-value highlight">${booking.service.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Fecha:</span>
                <span class="detail-value">${new Date(booking.startsAt).toLocaleDateString('es-AR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Hora:</span>
                <span class="detail-value">${new Date(booking.startsAt).toLocaleTimeString('es-AR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</span>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.SITE_URL}/turnos/confirmado/${booking.id}" class="button">
                Ver Detalles
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              ¡Nos vemos mañana! ✨
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Mariana Rojas</strong> - Uñas y Pestañas</p>
            <p>📞 +54 9 11 1234-5678 | 📧 hola@marianarojas.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
}

