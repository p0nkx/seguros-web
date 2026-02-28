import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("--- DEBUG DE CREDENCIALES ---");
console.log("EMAIL_USER definido:", !!process.env.EMAIL_USER);
console.log("Longitud de EMAIL_PASS:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER?.trim(), // .trim() elimina espacios invisibles
    pass: process.env.EMAIL_PASS?.trim(),
  },
  // Añade esto para asegurar que no falle por protocolos viejos
  authMethod: 'PLAIN'
});

    // Preparamos el link de WhatsApp con el prefijo +54 (Argentina)
    // Eliminamos cualquier carácter que no sea número del teléfono del cliente
    const numeroLimpio = data.telefono.replace(/\D/g, '');
    const linkWhatsApp = `https://wa.me/54${numeroLimpio}`;

    const mensajeHTML = `
      <div style="background-color: #050b18; padding: 20px 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; width: 100% !important;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 95%; background-color: #0a1224; border-radius: 24px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
          <tr>
            <td style="padding: 0;">
              
              <div style="background: linear-gradient(180deg, #163594 0%, #0a1224 100%); padding: 40px 20px; text-align: center;">
                <a href="https://estudio-nag.vercel.app/" style="text-decoration: none;">
                  <img src="https://estudio-nag.vercel.app/logo-blanco-cuadrado.png" alt="ESTUDIO NAG" style="height: 75px; width: auto; margin-bottom: 15px; border: 0;" />
                </a>
                <div style="color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 5px; text-transform: uppercase;">ESTUDIO NAG</div>
                <div style="color: #3b82f6; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-top: 10px; font-weight: 600;">Protegemos lo que más importa</div>
              </div>

              <div style="padding: 30px 25px;">
                
                <div style="background: linear-gradient(90deg, rgba(22,53,148,1) 0%, rgba(37,99,235,1) 100%); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.1);">
                  <div style="color: rgba(255,255,255,0.7); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; font-weight: 700;">Solicitud de Cobertura</div>
                  <div style="color: #ffffff; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                    ${data.tipoSeguro}
                  </div>
                </div>

                <div style="text-align: right; margin-bottom: 20px;">
                  <span style="color: #475569; font-size: 10px; font-weight: bold; text-transform: uppercase; border: 1px solid #1e293b; padding: 6px 12px; border-radius: 8px;">
                    REF: #${Math.floor(1000 + Math.random() * 9000)}
                  </span>
                </div>

                <div style="background: #111b31; border: 1px solid #1e293b; border-radius: 20px; padding: 30px; margin-bottom: 30px;">
                  <h3 style="margin: 0 0 20px 0; color: #3b82f6; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid rgba(59, 130, 246, 0.1); padding-bottom: 10px;">Información del Cliente</h3>
                  
                  <div style="margin-bottom: 20px;">
                    <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Nombre Completo</div>
                    <div style="color: #ffffff; font-size: 20px; font-weight: 700; text-transform: uppercase;">${data.nombre}</div>
                  </div>
                  
                  <div style="margin-bottom: 20px;">
                    <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Teléfono de Contacto</div>
                    <div style="color: #ffffff; font-size: 17px; font-weight: 600;">${data.telefono}</div>
                  </div>

                  <div>
                    <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Correo Electrónico</div>
                    <div style="color: #ffffff; font-size: 17px; font-weight: 600;">${data.email.toUpperCase()}</div>
                  </div>
                </div>

                <h3 style="margin: 0 0 15px 10px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Especificaciones Técnicas</h3>
                <div style="background: rgba(255,255,255,0.02); border-radius: 20px; padding: 5px 25px; border: 1px solid rgba(255,255,255,0.05);">
                  ${data.detalle.split('\n').map((line: string) => {
                    if (!line.trim()) return '';
                    const parts = line.split(':');
                    return `
                      <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 18px 0;">
                        <div style="color: #3b82f6; font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">${parts[0]}</div>
                        <div style="color: #ffffff; font-size: 16px; font-weight: 600; text-transform: uppercase; line-height: 1.4;">${parts[1] || '-'}</div>
                      </div>
                    `;
                  }).join('')}
                </div>

                <div style="margin-top: 45px; text-align: center;">
                  <a href="${linkWhatsApp}" style="background: #163594; color: #ffffff; padding: 22px 30px; text-decoration: none; border-radius: 14px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; display: block; box-shadow: 0 10px 20px rgba(22, 53, 148, 0.3);">
                    Contactar por WhatsApp (+54)
                  </a>
                  <p style="color: #475569; font-size: 10px; margin-top: 12px; text-transform: uppercase;">Atención inmediata al cliente</p>
                </div>

              </div>

              <div style="background-color: #050b18; padding: 30px; text-align: center; border-top: 1px solid #1e293b;">
                <div style="color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">ESTUDIO NAG</div>
                <div style="color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px;">
                  Gestión de Cotizaciones Digitales &copy; ${new Date().getFullYear()}
                </div>
              </div>

            </td>
          </tr>
        </table>
      </div>
    `;

    // Asunto dinámico para tu bandeja de entrada
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `NUEVA COTIZACIÓN: ${data.tipoSeguro.toUpperCase()} - ${data.nombre.toUpperCase()}`,
      html: mensajeHTML,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en el envío:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}